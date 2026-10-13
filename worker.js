// Cloudflare Worker entry: /api/ai goes to the AI handler, everything else is the static app.
import { handleAI } from './functions/api/ai.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/ai') return handleAI(request, env);
    return env.ASSETS.fetch(request);
  },
};
