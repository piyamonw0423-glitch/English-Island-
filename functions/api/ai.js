// AI endpoint for the web version: the app sends chat messages here and this
// calls the Anthropic Messages API with the key kept as a Cloudflare secret.
// Works as a Cloudflare Pages Function (this file) and from worker.js.

const MAX_MESSAGES = 40;
const MAX_CHARS = 24000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export async function handleAI(request, env) {
  if (request.method === 'GET') return json({ ok: !!env.ANTHROPIC_API_KEY, needKey: !!env.APP_PASSCODE });
  if (request.method !== 'POST') return json({ code: 'bad_method' }, 405);
  if (!env.ANTHROPIC_API_KEY) return json({ code: 'not_configured', message: 'ANTHROPIC_API_KEY is not set' }, 503);
  if (env.APP_PASSCODE && request.headers.get('x-app-key') !== env.APP_PASSCODE) return json({ code: 'need_key' }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ code: 'bad_request' }, 400); }
  const messages = Array.isArray(body && body.messages) ? body.messages : null;
  if (!messages || !messages.length || messages.length > MAX_MESSAGES) return json({ code: 'bad_request' }, 400);
  let chars = 0;
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') return json({ code: 'bad_request' }, 400);
    chars += m.content.length;
  }
  if (chars > MAX_CHARS) return json({ code: 'too_long' }, 413);

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: env.MODEL || 'claude-sonnet-5-5',
      max_tokens: 2000,
      system: 'You are Jelly Boo, a kind English tutor inside a learning app for a Thai adult learner. When the request asks for JSON, reply with only that JSON and nothing else.',
      messages,
    }),
  });
  if (res.status === 429) return json({ code: 'rate_limited' }, 429);
  if (!res.ok) return json({ code: 'upstream_error', status: res.status }, 502);
  const data = await res.json();
  const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  return json({ text });
}

export const onRequest = ctx => handleAI(ctx.request, ctx.env);
