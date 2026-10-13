# English Island · Jelly English

แอปฝึกภาษาอังกฤษวันละ 10–15 นาที กับเจลลี่บู ผีเยลลี่สีชมพู
ติดตั้งลงมือถือหรือคอมได้ (PWA) และใช้งานได้แม้ไม่มีเน็ต

## มีอะไรในแอป
- สอบวัดระดับก่อนเริ่ม แล้วเรียน 32 บท จาก A1 ถึง B2
- คำศัพท์ Oxford, ทบทวนแบบ Active Recall, Shadowing
- ภารกิจท่องอวกาศประจำวัน 5 ดาว หีบสมบัติรายสัปดาห์ XP และเลเวล

## ติดตั้ง
- **iPhone:** เปิดลิงก์ใน Safari → ปุ่มแชร์ → เพิ่มไปยังหน้าจอโฮม
- **Android:** เปิดใน Chrome → เมนู ⋮ → ติดตั้งแอป
- **คอม:** เปิดใน Chrome/Edge → ไอคอนติดตั้งที่แถบที่อยู่เว็บ

## อัปเดตแอป
แทนที่ `index.html` แล้วเปลี่ยน `VERSION` ใน `sw.js` (เช่น `epl-v20`) ทุกครั้ง เพื่อให้เครื่องที่ติดตั้งไว้โหลดเวอร์ชันใหม่

## หมายเหตุ
- ความคืบหน้าเก็บไว้ในเครื่องที่ใช้งาน
- ฟีเจอร์ AI (คุยกับเจลลี่บู, ข้อสอบ AI) ใช้ได้เมื่อเปิดแอปใน Claude

## Deploy ขึ้น Cloudflare
repo นี้เป็นเว็บ static ไม่ต้อง build
- **Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git → เลือก repo นี้ → Framework preset: `None`, Build command: เว้นว่าง, Build output directory: `/`
- **Cloudflare Workers:** Workers & Pages → Create → Import a repository → เลือก repo นี้ → Deploy command: `npx wrangler deploy` (ใช้ค่าใน `wrangler.jsonc`)
