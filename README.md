# English Island · Jelly English

แอปฝึกภาษาอังกฤษวันละ 10–15 นาที กับเจลลี่บู ผีเยลลี่สีชมพู
ติดตั้งลงมือถือหรือคอมได้ (PWA) และใช้งานได้แม้ไม่มีเน็ต

## มีอะไรในแอป
- สอบวัดระดับก่อนเริ่ม แล้วเรียน 32 บท จาก A1 ถึง B2
- คำศัพท์ Oxford, ทบทวนแบบ Active Recall, Shadowing
- ภารกิจท่องอวกาศประจำวัน 5 ดาว หีบสมบัติรายสัปดาห์ XP และเลเวล
- ฝึกโครงสร้างประโยค (Daily Recall) วันละ 6 ข้อ ไล่ 4 เลเวล: เติมคำ → แปล → แต่งเอง → ตอบครูและถามกลับ พร้อมคลังจุดพลาด
- คู่มือ Tense 6 แบบที่ใช้พูดจริง กฎทองการตั้งคำถาม และ be + V-ing ตอนนี้/อนาคต
- ตัวนับชั่วโมงเรียนกับครูและ Roadmap 8 สัปดาห์ (ในหน้า พูด → คลาสกับครู)

## ติดตั้ง
- **iPhone:** เปิดลิงก์ใน Safari → ปุ่มแชร์ → เพิ่มไปยังหน้าจอโฮม
- **Android:** เปิดใน Chrome → เมนู ⋮ → ติดตั้งแอป
- **คอม:** เปิดใน Chrome/Edge → ไอคอนติดตั้งที่แถบที่อยู่เว็บ

## อัปเดตแอป
แทนที่ `index.html` แล้วเปลี่ยน `VERSION` ใน `sw.js` (เช่น `epl-v20`) ทุกครั้ง เพื่อให้เครื่องที่ติดตั้งไว้โหลดเวอร์ชันใหม่

## หมายเหตุ
- ความคืบหน้าเก็บไว้ในเครื่องที่ใช้งาน
- ฟีเจอร์ AI ใช้ได้บนเว็บเมื่อ Deploy ผ่าน Cloudflare และตั้งค่า API key แล้ว (ดูด้านล่าง)

## Deploy ขึ้น Cloudflare
repo นี้เป็นเว็บ static ไม่ต้อง build
- **Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git → เลือก repo นี้ → Framework preset: `None`, Build command: เว้นว่าง, Build output directory: `/`
- **Cloudflare Workers:** Workers & Pages → Create → Import a repository → เลือก repo นี้ → Deploy command: `npx wrangler deploy` (ใช้ค่าใน `wrangler.jsonc`)

## เปิดใช้ AI บนเว็บ (ตรวจไวยากรณ์ คุยกับเจลลี่บู สร้างบทเรียน)
AI ทำงานผ่าน `/api/ai` (ไฟล์ `functions/api/ai.js` และ `worker.js`) ซึ่งเรียก Claude API ด้วยคีย์ของเราเอง คีย์จะเก็บไว้ที่ Cloudflare ไม่อยู่ในโค้ด
1. สร้าง API key ที่ https://console.anthropic.com (คิดเงินตามการใช้งาน)
2. Cloudflare → project นี้ → **Settings → Variables and Secrets** → เพิ่มแบบ **Secret**
   - `ANTHROPIC_API_KEY` = API key
   - `APP_PASSCODE` = รหัสแอปที่ตั้งเอง (แนะนำ เพื่อไม่ให้คนอื่นใช้ AI ด้วยเงินของเรา)
   - `MODEL` (ไม่บังคับ) ค่าเริ่มต้น `claude-sonnet-5-5`
3. กด Deploy ใหม่ 1 ครั้ง แอปจะถามรหัสแอปครั้งแรกที่ใช้ AI แล้วจำไว้ในเครื่อง

หมายเหตุ: GitHub Pages ไม่มีเซิร์ฟเวอร์ ฟีเจอร์ AI จึงใช้ได้เฉพาะลิงก์ Cloudflare
