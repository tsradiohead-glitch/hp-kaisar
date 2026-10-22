// ===== HP Kaisar — engine =====
// Ceritanya naskah di data.js. Jam di HP mulai dari STORY.start dan jalan real-time.
// Test: tambah ?now=2026-10-22T07:40 di URL buat ganti jam awal.
const $ = (s, r = document) => r.querySelector(s);
const layersEl = $("#layers");

// CSS tambahan (skin iMessage & WhatsApp, kalender, dll) — disuntik biar style.css asli ga perlu diubah
(() => {
  const s = document.createElement("style");
  s.id = "kaisar-css";
  s.textContent = `@keyframes dropin{from{opacity:0;transform:translateY(-16px) scale(.96)}}
.lk-notes{max-height:420px;overflow:hidden}
.lk-notes .ncard{animation:dropin .45s cubic-bezier(.2,.8,.2,1) both}
.ph-img{display:block}
/* foto di dalam chat: ukuran asli, dibatasi max 220x280 (ph-img bawaan style.css itu absolute & full) */
.ph{position:relative;background:#d9dce1;border-radius:7px;overflow:hidden;line-height:0}
.ph:empty{width:200px;height:240px} /* kalau gambarnya belum ada: kotak abu-abu */
.wab .ph-img,.imb .ph-img{position:static;inset:auto;display:block;width:auto;height:auto;max-width:220px;max-height:280px;object-fit:contain}
.ptile,.pbig,.evth{background:#d9dce1;overflow:hidden}
.ptile .ph-img,.evth .ph-img,.mart .ph-img{width:100%;height:100%;object-fit:cover}
.music .sart,.mini .mart2{background:#e5e5ea}
.call .no[disabled]{opacity:.35;pointer-events:none;filter:grayscale(1)}
.evth{width:46px;height:46px;border-radius:9px;margin-left:10px;flex:none}
.evdet{position:absolute;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;z-index:20}
.evdet .card{width:100%;background:#fff;border-radius:22px 22px 0 0;padding:20px 18px 44px}
.evdet .et i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:8px}
.evdet .big{width:100%;aspect-ratio:1;border-radius:14px;overflow:hidden;background:#e5e5ea;margin-top:14px}
/* daftar chat */
.applist{background:#fff}
.applist .srch{margin:0 16px 10px;height:36px;border-radius:10px;background:#eeeef0;color:#8e8e93;display:flex;align-items:center;gap:6px;padding:0 10px;font-size:16px}
.pins{display:flex;gap:18px;justify-content:center;padding:6px 16px 16px;flex-wrap:wrap}
.pin{position:relative;width:76px;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:12px;color:#000}
.pin .av{width:68px;height:68px}
.pin .dot{position:absolute;left:-4px;top:26px;width:12px;height:12px;border-radius:50%;background:#007aff;z-index:3}
.mrow{position:relative;display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:8px 16px;color:#000}
.mrow .av{width:50px;height:50px;flex:none}
.mrow .mt{flex:1;min-width:0;border-bottom:.5px solid #e5e5ea;padding:4px 0 10px}
.mrow .m1{display:flex;justify-content:space-between;gap:8px;font-size:16px}
.mrow .m1 span{font-size:14px;color:#8e8e93;font-weight:400}.mrow .m1 span.new{color:#25d366}
.mrow .m2{font-size:14.5px;color:#8e8e93;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.mrow .mdot{position:absolute;left:3px;top:50%;margin-top:-6px;width:11px;height:11px;border-radius:50%;background:#007aff;z-index:3}
.nl{font-size:11px;letter-spacing:.6px;color:rgba(0,0,0,.45);font-weight:600;margin-bottom:1px}.pinic{font-style:normal;font-size:11px;margin-right:4px}
.wbadge{min-width:20px;height:20px;border-radius:10px;background:#25d366;color:#fff;font-size:12px;display:grid;place-items:center;padding:0 6px;margin-top:18px}
.chips{display:flex;gap:8px;padding:0 16px 10px;font-size:14px}.chips span{padding:6px 12px;border-radius:16px;background:#f0f2f5;color:#54656f}.chips span.on{background:#d9fdd3;color:#0a6b3a}
.wtabs{display:flex;justify-content:space-around;padding:8px 0 30px;border-top:.5px solid #ddd;background:#f6f6f6;font-size:10px;color:#8e8e93}
.wtabs div{display:flex;flex-direction:column;align-items:center;gap:3px}.wtabs div.on{color:#25d366}
.wtabs svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6}
.applist.wa .nav .act svg{stroke:#25d366}
/* jendela chat */
.cwin{background:#fff}
.cwin .cnav{border-bottom:.5px solid #d8d8d8;align-items:flex-end;padding-bottom:6px;min-height:104px}
.cwin .cnav .back{min-width:54px}.cwin .cnav .back span{font-size:16px}
.cwin .cnav .act{min-width:54px}.cwin .cnav .act svg{width:24px;height:24px;fill:none;stroke:#007aff;stroke-width:1.8;stroke-linejoin:round}
.imsg .cnav{background:#f7f7f7}
.imhd{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;min-width:0}
.imhd .av{width:38px;height:38px}
.cwall{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center}
.cwall::after{content:"";position:absolute;inset:0;background:rgba(255,255,255,var(--dim,.3))}
.cwin>.body{position:relative;z-index:1}
.cwin>.cin,.cwin>.kb{position:relative;z-index:2}
.imsg>.body{padding:6px 12px 14px;background:#fff}
.wapp>.body{padding:8px 10px 14px;background:#efe7dd}
.cwin.haswall>.body{background:transparent}
.imdate{text-align:center;font-size:11px;color:#8e8e93;margin:14px 0 6px}.imdate b{font-weight:600}
.imr{display:flex;margin:2px 0}.imr.me{justify-content:flex-end}
.imb{max-width:75%;padding:7px 12px;border-radius:18px;font-size:16px;line-height:1.28;background:#e9e9eb;color:#000;white-space:pre-wrap;word-break:break-word}
.imr.me .imb{background:#0b84fe;color:#fff}
.imr.them .imb.tail{border-bottom-left-radius:5px}.imr.me .imb.tail{border-bottom-right-radius:5px}
.imb.photo{padding:0;overflow:hidden;background:none}
.imrd{text-align:right;font-size:11px;color:#8e8e93;margin:2px 4px 0;font-weight:500}
.typing-b{display:flex;gap:4px;padding:12px 14px}.typing-b i{width:7px;height:7px;border-radius:50%;background:#9b9ba0;animation:tb 1s infinite}
.typing-b i:nth-child(2){animation-delay:.15s}.typing-b i:nth-child(3){animation-delay:.3s}
@keyframes tb{50%{opacity:.35;transform:translateY(-2px)}}
.imr.fresh,.war.fresh{animation:dropin .3s ease both}
/* whatsapp */
.wapp .cnav{background:#f6f6f6}
.wahd{flex:1;display:flex;align-items:center;gap:8px;min-width:0}
.wahd .av{width:36px;height:36px;flex:none}.wahd b{font-size:16px;display:block;font-weight:600}
.wahd small{font-size:11.5px;color:#667781;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wadate{text-align:center;margin:12px 0 8px}
.wadate span{background:#fff;font-size:12.5px;padding:5px 11px;border-radius:8px;box-shadow:0 1px .5px rgba(0,0,0,.1);color:#54656f}
.war{display:flex;margin:2px 0}.war.me{justify-content:flex-end}.war.head{margin-top:8px}
.wab{max-width:80%;background:#fff;border-radius:9px;padding:6px 9px 5px;font-size:15.5px;line-height:1.3;box-shadow:0 1px .5px rgba(0,0,0,.13);white-space:pre-wrap;word-break:break-word}
.war.me .wab{background:#d9fdd3}
.wan{font-size:13px;font-weight:600;margin-bottom:1px}
.wat{float:right;margin:6px 0 -3px 10px;font-size:11px;color:#667781;display:inline-flex;gap:3px;white-space:nowrap}
.tk{font-style:normal;color:#53bdeb;letter-spacing:-3px}
.wab.pic{padding:3px 3px 5px}
/* composer + keyboard */
.cin{flex:none;display:flex;align-items:center;gap:8px;padding:8px 10px 30px;background:#fff}
.wapp .cin{background:#f6f6f6}
.cin .plus{width:32px;height:32px;border-radius:50%;background:#e9e9eb;display:grid;place-items:center;flex:none}
.wapp .cin .plus{background:none}
.cin .plus svg{width:18px;height:18px;fill:none;stroke:#555;stroke-width:2;stroke-linecap:round}
.cf{flex:1;min-height:36px;border:1px solid #c8c8cc;border-radius:19px;padding:7px 14px;font-size:16px;line-height:20px;overflow:hidden;white-space:nowrap;cursor:text;background:#fff}
.wapp .cf{border:none;border-radius:20px}
.cf:empty::before{content:attr(data-ph);color:#c0c0c4}
.cf.typing-now::after{content:"";display:inline-block;width:2px;height:18px;background:#007aff;vertical-align:-3px;margin-left:1px;animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.csend{display:none;width:30px;height:30px;border-radius:50%;background:#0b84fe;place-items:center;flex:none}
.wapp .csend{background:#25d366}.csend.on{display:grid}
.csend svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.cwin.kb-open .kb{display:flex}.cwin.kb-open .cin{padding-bottom:8px}
.key.down{background:#abb0ba}
.wake{background:#000;display:flex;align-items:flex-end;justify-content:center;padding-bottom:130px;cursor:pointer}
.wk-hint{color:rgba(255,255,255,.55);font-size:15px;animation:wkp 2.2s ease-in-out infinite}
@keyframes wkp{50%{opacity:.25}}
@keyframes wakein{from{opacity:0;filter:brightness(.2)}}
.lock{animation:wakein .55s ease both}
`;
  document.head.appendChild(s);
})();

// ---------- waktu ----------
const BASE = (() => {
  const q = new URLSearchParams(location.search).get("now");
  const t = q ? new Date(q).getTime() : NaN;
  return isNaN(t) ? new Date(STORY.start).getTime() : t;
})();
let BOOT = Date.now();
const now = () => new Date(BASE + Date.now() - BOOT);
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
if (UI[L]) {
  HARI.splice(0, 7, ...UI[L].hari);
  BULAN.splice(0, 12, ...UI[L].bulan);
}
const pad = (n) => String(n).padStart(2, "0");
const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const dayKey = (d = now()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const longDate = (d) =>
  `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}`;
function relDay(d) {
  const diff = Math.round((dayStart(now()) - dayStart(d)) / 864e5);
  if (diff <= 0) return hm(d);
  if (diff === 1) return "Kemarin";
  if (diff < 7) return HARI[d.getDay()];
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
}
// "Min, 18 Okt" / "Hari ini"
const shortDate = (d) =>
  dayKey(d) === STORY.today
    ? "Hari ini"
    : `${HARI[d.getDay()].slice(0, 3)}, ${d.getDate()} ${BULAN[d.getMonth()].slice(0, 3)}`;
const waDate = (d) => {
  const k = dayKey(d);
  if (k === STORY.today) return "Hari ini";
  const diff = Math.round((dayStart(now()) - dayStart(d)) / 864e5);
  return diff === 1
    ? "Kemarin"
    : `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}`;
};

// HP (terutama iPhone) ga ngizinin suara diputar tanpa sentuhan: ringtone & notif "dibuka kuncinya" di sentuhan pertama, terus dipake ulang
// yg diputer pas sentuhan pertama cuma suara hening (bukan ringtone-nya), baru abis itu file aslinya dipasang
const SFX = {},
  SFX_SRC = { ringtone: "aud/ringtone.mp3", katalk: "aud/katalk.mp3" };
Object.keys(SFX_SRC).forEach((k) => {
  try {
    SFX[k] = new Audio();
  } catch (e) {}
});
function sfx(k) {
  const a = SFX[k] || (SFX[k] = new Audio());
  if (!a.src || /silent\.wav$/.test(a.src)) a.src = SFX_SRC[k];
  return a;
}
function unlockSfx() {
  document.removeEventListener("pointerdown", unlockSfx, true);
  document.removeEventListener("touchend", unlockSfx, true);
  Object.entries(SFX).forEach(([k, a]) => {
    const real = () => {
      a.pause();
      a.src = SFX_SRC[k];
      a.loop = k === "ringtone";
      a.preload = "auto";
      a.load();
    };
    a.src = "aud/silent.wav";
    const p = a.play();
    if (p) p.then(real).catch(real);
    else real();
  });
}
document.addEventListener("pointerdown", unlockSfx, true);
document.addEventListener("touchend", unlockSfx, true);

// ---------- state ----------
const S = { unlocked: false, stage: "idle", lockN: [], callLog: [] };
let voiceEl = null;
const charging = () => false;
const battery = () => 0.72;

// ---------- siapkan pesan ----------
CHATS.forEach((c) => {
  let day = null;
  c.items = [];
  c.msgs.forEach(([who, text, time, o = {}]) => {
    if (who === "date") {
      day = text;
      return;
    }
    c.items.push({ who, text, o, ts: new Date(`${day}T${time}`) });
  });
  c.read = Math.max(0, c.items.length - (c.unread0 || 0));
});
const chatById = (id) => CHATS.find((c) => c.id === id);
const unread = (c) =>
  c.items.slice(c.read).filter((i) => i.who !== "me").length;
const inApp = (c, app) => c.app === app || c.also === app;
const unreadApp = (app) =>
  CHATS.filter((c) => inApp(c, app)).reduce((a, c) => a + unread(c), 0);
const lastMsg = (c) => c.items[c.items.length - 1];
const preview = (c, m) =>
  !m
    ? ""
    : (c.group && m.who !== "me" ? m.who + ": " : c.group ? "Anda: " : "") +
      (m.o.img ? "📷 Foto" : m.text);
function markRead(c) {
  c.read = c.items.length;
  refreshHome();
}

const h = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// link Google Drive (file/d/ID, open?id=, uc?id=) otomatis diubah jadi link gambar langsung
const U = (s) => {
  if (!s) return s;
  const m = String(s).match(
    /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/,
  );
  return m ? `https://lh3.googleusercontent.com/d/${m[1]}=w1000` : s;
};
const im = (src) =>
  !(src = U(src))
    ? ""
    : /\.mp4$/.test(src)
      ? `<video class="ph-img" src="${src}#t=0.5" muted playsinline preload="metadata"></video><span class="vdur">▶</span>`
      : `<img class="ph-img" src="${src}" alt="" onerror="this.remove()">`;
const PERSON_SVG =
  '<svg viewBox="0 0 32 40"><circle cx="16" cy="11" r="8"/><path d="M0 40c0-10 7-16 16-16s16 6 16 16z"/></svg>';
const av = (name, cls = "") => {
  const p = PEOPLE[name] || {};
  if (p.emoji)
    return `<div class="av ${cls}" style="background:${p.bg};display:grid;place-items:center;font-size:22px">${p.emoji}</div>`;
  return `<div class="av ${cls}">${PERSON_SVG}${p.av ? `<img src="${U(p.av)}" alt="" onerror="this.remove()">` : ""}</div>`;
};
const GROUP_AV = `<div class="av" style="background:#c1cfdc"><svg viewBox="0 0 32 40" style="left:8%;width:50%"><circle cx="16" cy="11" r="8"/><path d="M0 40c0-10 7-16 16-16s16 6 16 16z"/></svg><svg viewBox="0 0 32 40" style="left:44%;width:50%;opacity:.8"><circle cx="16" cy="11" r="8"/><path d="M0 40c0-10 7-16 16-16s16 6 16 16z"/></svg></div>`;
const chatAv = (c) => {
  const p = PEOPLE[c.person];
  return c.group && !(p && p.av) ? GROUP_AV : av(c.person);
};
const CHEV =
  '<svg class="chev" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg>';
const BACK = '<svg viewBox="0 0 12 21"><path d="M10 2L2 10.5 10 19"/></svg>';
const ICONS = {
  photos: (() => {
    const c = [
      "#F9B529",
      "#F47B2A",
      "#EA3F5A",
      "#C63CB4",
      "#7D57DA",
      "#3B8BE6",
      "#34B7C9",
      "#8BCB3C",
    ];
    return `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><g style="mix-blend-mode:multiply">${c.map((col, i) => `<ellipse cx="30" cy="19.5" rx="5.6" ry="10.5" fill="${col}" opacity=".88" transform="rotate(${i * 45} 30 30)"/>`).join("")}</g></svg>`;
  })(),
  notes: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><rect width="60" height="17" fill="#FDD13A"/><rect y="15" width="60" height="2" fill="#E8B92A"/><path d="M8 27h44M8 35h44M8 43h44M8 51h44" stroke="#D8D8DC" stroke-width="1.2"/><path d="M8 20.5h44" stroke="#C6C6CB" stroke-width="1.6" stroke-dasharray="1.6 2.4"/></svg>`,
  calendar: (d) =>
    `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><text x="30" y="17" text-anchor="middle" font-family="-apple-system,Helvetica,Arial" font-weight="600" font-size="9.5" fill="#FF3B30">${HARI[d.getDay()]}</text><text x="30" y="45" text-anchor="middle" font-family="-apple-system,Helvetica,Arial" font-weight="300" font-size="30" fill="#000">${d.getDate()}</text></svg>`,
  settings: `<svg viewBox="0 0 60 60"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4C4C9"/><stop offset="1" stop-color="#8A8A90"/></linearGradient></defs><rect width="60" height="60" fill="url(#sg)"/><circle cx="30" cy="30" r="19" fill="none" stroke="#3E3E43" stroke-width="7" stroke-dasharray="3.3 2.67"/><circle cx="30" cy="30" r="16.5" fill="#3E3E43"/><circle cx="30" cy="30" r="13" fill="#D3D3D8"/>${[0, 60, 120].map((a) => `<path d="M30 18v24" stroke="#8A8A90" stroke-width="2.2" transform="rotate(${a} 30 30)"/>`).join("")}<circle cx="30" cy="30" r="6" fill="#3E3E43"/><circle cx="30" cy="30" r="3.2" fill="#C4C4C9"/></svg>`,
  phone: `<svg viewBox="0 0 60 60"><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6AE37F"/><stop offset="1" stop-color="#2EBC4E"/></linearGradient></defs><rect width="60" height="60" fill="url(#pg)"/><path d="M22.4 15.6c-1-.9-2.6-.8-3.5.2l-2.6 2.8c-1.6 1.8-1.9 4.4-.8 6.5 4 7.9 9.9 13.8 17.6 17.7 2.1 1.1 4.7.8 6.5-.8l2.9-2.6c1-.9 1.1-2.5.2-3.5l-4.3-4.6c-.9-1-2.4-1.1-3.4-.3l-2.7 2.2c-3.7-2-6.7-5-8.7-8.8l2.1-2.6c.8-1 .7-2.5-.2-3.4z" fill="#fff"/></svg>`,
  music: `<svg viewBox="0 0 60 60"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FB5C74"/><stop offset="1" stop-color="#FA233B"/></linearGradient></defs><rect width="60" height="60" fill="url(#mg)"/><path d="M38.5 13.5l-14.5 3.2c-.9.2-1.5 1-1.5 1.9v17.1a5.6 5.6 0 1 0 2.8 4.8V24.7l11.6-2.6v10.8a5.6 5.6 0 1 0 2.8 4.8V15.4c0-1.2-1.1-2.1-2.2-1.9z" fill="#fff"/></svg>`,
  imessage: `<svg viewBox="0 0 60 60"><defs><linearGradient id="img" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BF675"/><stop offset="1" stop-color="#0CBD2A"/></linearGradient></defs><rect width="60" height="60" fill="url(#img)"/><path d="M30 14c-9.9 0-18 6.2-18 13.8 0 4.3 2.6 8.1 6.6 10.6-.3 2.2-1.3 4.2-2.8 5.9 3.1-.5 5.7-1.8 7.4-3.3 2.2.6 4.5.9 6.8.9 9.9 0 18-6.2 18-13.8S39.9 14 30 14z" fill="#fff"/></svg>`,
  wa: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#25D366"/><path d="M30 12.5a17.5 17.5 0 0 0-15 26.4L12.5 47.5l9.1-2.4A17.5 17.5 0 1 0 30 12.5z" fill="none" stroke="#fff" stroke-width="3.2" stroke-linejoin="round"/><path d="M24 22c-.8 0-1.8.6-1.8 2.2 0 3.8 5.4 10.6 11.3 11.5 1.8.3 3.2-1 3.2-2.3l-3-1.7-1.6 1.2c-2.2-.9-4.1-2.8-5-5l1.3-1.6z" fill="#fff"/></svg>`,
};
const ST_SIGNAL =
  '<svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
const ST_WIFI =
  '<svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3C13.5 1.5 10.9.4 8 .4S2.5 1.5.5 3.4l1.2 1.3C3.4 3.1 5.6 2.2 8 2.2zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3C11.6 4.7 9.9 4 8 4s-3.6.7-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4zM8 9.4c.5 0 1 .2 1.3.5L8 11.6 6.7 9.9c.3-.3.8-.5 1.3-.5z"/></svg>';
const ST_BATT = (p, ch = charging()) =>
  `<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="${Math.max(2, 20 * p)}" height="9" rx="2" fill="${ch ? "#34c759" : p < 0.2 ? "#ff3b30" : "currentColor"}"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" opacity=".4"/>${ch ? '<path d="M13.4 2.2 8.6 7h3l-1.3 4 4.9-5h-3.1z" fill="#fff" stroke="#000" stroke-width=".4"/>' : ""}</svg>`;
const SVG_PHONE =
  '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>';

// ---------- status bar ----------
function tickStatus() {
  const st = $("#status");
  st.querySelector(".st-t").textContent = hm(now());
  st.querySelector(".st-b").innerHTML = ST_BATT(battery());
  document
    .querySelectorAll("[data-clock]")
    .forEach((e) => (e.textContent = hm(now())));
}
$("#status").innerHTML =
  `<span class="st-t"></span><span class="island"></span><span class="st-r">${ST_SIGNAL}${ST_WIFI}<span class="st-b"></span></span>`;
tickStatus();

// ---------- layers ----------
function setBase(el) {
  layersEl.innerHTML = "";
  push(el);
}
function push(el) {
  el.classList.add("layer");
  layersEl.appendChild(el);
  syncChrome();
  return el;
}
// keluar dgn animasi: layer dipindah ke #exits biar urutan layer lain langsung bener
const exitsEl = (() => {
  const e = document.createElement("div");
  e.id = "exits";
  $("#screen").appendChild(e);
  return e;
})();
function animOut(el, kind) {
  if (!el || el.classList.contains("lock") || el.classList.contains("intro")) {
    el && el.remove();
    return;
  }
  exitsEl.appendChild(el);
  el.classList.add(kind);
  setTimeout(() => el.remove(), 320);
}
function pop() {
  const top = layersEl.lastElementChild;
  if (top && layersEl.children.length > 1) {
    animOut(top, top.classList.contains("sub") ? "exit-sub" : "exit-app");
    syncChrome();
    refreshUnder();
  }
}
function popTo(n) {
  if (layersEl.children.length <= n) return;
  const top = layersEl.lastElementChild;
  while (layersEl.children.length > n + 1) layersEl.children[n].remove();
  animOut(
    top,
    n <= 1
      ? "exit-app"
      : top.classList.contains("sub")
        ? "exit-sub"
        : "exit-app",
  );
  syncChrome();
  refreshUnder();
  const h0 = layersEl.firstElementChild;
  if (n <= 1 && h0 && h0.classList.contains("home")) {
    h0.classList.remove("rein");
    void h0.offsetWidth;
    h0.classList.add("rein");
  }
}
const topL = () => layersEl.lastElementChild;
function refreshUnder() {
  refreshHome();
}
function syncChrome() {
  const t = topL();
  const dark = t && t.dataset.dark === "1";
  $("#status").classList.toggle("dark", dark);
  $("#homebar").classList.toggle("dark", dark);
  $("#status").style.visibility = t && t.dataset.nostatus ? "hidden" : "";
}
$("#homebar").onclick = () => {
  if (topL() && topL().classList.contains("cam")) return pop();
  if (!S.unlocked) return passcode();
  const t = topL();
  if (t && t.dataset.modal) return;
  if (layersEl.children.length > 1) popTo(1);
};

// ---------- notifikasi ----------
function ncard({
  icon = ICONS.imessage,
  title,
  body,
  when = "sekarang",
  label = "",
}) {
  return `<div class="ncard"><div class="ni">${icon}</div><div class="nt">${label ? `<div class="nl">${label}</div>` : ""}<div class="nh">${esc(title)}<span>${esc(when)}</span></div><div class="nb">${esc(body)}</div></div></div>`;
}
function notifSfx() {
  try {
    const a = sfx("katalk");
    a.currentTime = 0;
    a.play().catch(() => {
      tone([1568], 0, 0.09, 0.07, "triangle");
      tone([2093], 0.1, 0.14, 0.07, "triangle");
    });
  } catch (e) {}
}
function toast(opts) {
  notifSfx();
  $("#toasts")
    .querySelectorAll(".ncard")
    .forEach((x) => x.remove());
  const el = h(ncard(opts));
  let gone = false;
  const close = () => {
    if (gone) return;
    gone = true;
    el.classList.add("out");
    setTimeout(() => el.remove(), 300);
  };
  let y0 = null;
  el.addEventListener("pointerdown", (e) => {
    y0 = e.clientY;
  });
  el.addEventListener("pointermove", (e) => {
    if (y0 !== null && y0 - e.clientY > 12) {
      y0 = null;
      close();
    }
  });
  el.onclick = () => {
    if (gone) return;
    close();
    opts.onClick && opts.onClick();
  };
  $("#toasts").appendChild(el);
  setTimeout(close, opts.ms || 3500);
}
const appIconOf = (c) => (c.app === "wa" ? ICONS.wa : ICONS.imessage);
// pesan baru dari lawan chat: masuk ke chat + notif (lockscreen / banner / langsung tampil kalau chatnya lagi kebuka)
function deliver(c, text) {
  c.items.push({ who: "them", text, o: {}, ts: now() });
  const t = topL();
  if (t && t.dataset.chat === c.id) {
    renderChat(t, c);
    markRead(c);
    return;
  }
  const n = {
    icon: appIconOf(c),
    title: c.name,
    body: text,
    when: "sekarang",
    label: c.app === "wa" ? "WHATSAPP" : "PESAN",
  };
  if (!S.unlocked) {
    notifSfx();
    S.lockN.push(n);
    refreshLock();
  } else toast({ ...n, onClick: () => openApp(c.app, c.id) });
  refreshHome();
}

// ---------- intro ----------
function intro() {
  // layar HP awalnya "mati": sentuhan pertama = nyalain layar. Sentuhan ini juga yang bikin browser ngizinin suara notif & ringtone.
  const el = h(
    `<div class="wake" data-nostatus="1"><div class="wk-hint">Ketuk untuk menyalakan layar</div></div>`,
  );
  const on = () => {
    el.onclick = null;
    BOOT = Date.now();
    tickStatus();
    lock();
  };
  el.onclick = on;
  setBase(el);
}

// ---------- lock screen ----------
const lockCards = () => S.lockN.slice().reverse().map(ncard).join("");
function refreshLock() {
  const t = topL();
  const l = layersEl.querySelector(".lock");
  if (l) l.querySelector(".lk-notes").innerHTML = lockCards();
}
function startDrip() {
  if (S.stage !== "idle") return;
  S.stage = "drip";
  const c = chatById(DRIP.chat);
  let i = 0;
  const next = () => {
    deliver(c, DRIP.lines[i++]);
    if (i < DRIP.lines.length) setTimeout(next, DRIP.gap);
    else S.stage = "await";
  };
  setTimeout(next, DRIP.first);
}
function lock() {
  S.unlocked = false;
  const el = h(`<div class="lock">${im(STORY.wallLock)}<div class="shade"></div>
    <div class="lk-top"><div class="lk-date">${longDate(now())}</div><div class="lk-time" data-clock="lock">${hm(now())}</div></div>
    <div class="lk-notes">${lockCards()}</div>
    <div class="lk-bot"><div class="lk-btn"><svg viewBox="0 0 24 24"><path d="M8 2h8v4l-2 3v13h-4V9L8 6z"/></svg></div><div class="lk-btn lk-cam"><svg viewBox="0 0 24 24"><path d="M9 4l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4zm3 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/></svg></div></div>
  </div>`);
  let y0 = null;
  el.addEventListener("pointerdown", (e) => (y0 = e.clientY));
  el.addEventListener("pointerup", (e) => {
    if (y0 !== null && (y0 - e.clientY > 40 || e.target.closest(".ncard")))
      passcode();
    y0 = null;
  });
  setBase(el);
  startDrip();
}
function passcode() {
  if (layersEl.querySelector(".pass") || S.unlocked) return;
  if (S.stage === "idle" || S.stage === "drip") return; // tunggu 4 notif masuk dulu
  let code = "";
  const keys = [
    ["1", ""],
    ["2", "ABC"],
    ["3", "DEF"],
    ["4", "GHI"],
    ["5", "JKL"],
    ["6", "MNO"],
    ["7", "PQRS"],
    ["8", "TUV"],
    ["9", "WXYZ"],
  ];
  const el = h(`<div class="pass" data-nostatus="">
    <div class="blurbg" style="background-image:url('${STORY.wallLock}')"></div>
    <div class="pt">Masukkan Kode Sandi</div>
    <div class="pdots">${"<i></i>".repeat(4)}</div>
    <div class="pkeys">${keys.map(([n, l]) => `<button class="pk" data-n="${n}">${n}<small>${l}</small></button>`).join("")}<span></span><button class="pk" data-n="0">0</button><span></span></div>
    <div class="pbot"><button class="emg">Darurat</button><button class="cancel">Batal</button></div>
  </div>`);
  const dots = el.querySelector(".pdots");
  const draw = () => {
    [...dots.children].forEach((d, i) =>
      d.classList.toggle("on", i < code.length),
    );
    el.querySelector(".cancel").textContent = code ? "Hapus" : "Batal";
  };
  el.querySelectorAll(".pk").forEach(
    (b) =>
      (b.onclick = () => {
        if (code.length >= 4) return;
        code += b.dataset.n;
        draw();
        if (code.length === 4)
          setTimeout(() => {
            if (code === STORY.passcode) return unlock();
            dots.classList.add("shake");
            setTimeout(() => dots.classList.remove("shake"), 450);
            code = "";
            draw();
          }, 120);
      }),
  );
  el.querySelector(".cancel").onclick = () => {
    if (code) {
      code = code.slice(0, -1);
      draw();
    } else pop();
  };
  push(el);
}
function unlock() {
  S.unlocked = true;
  S.lockN = [];
  home();
}

// ---------- home ----------
const APPS = [
  { id: "photos", name: "Foto" },
  { id: "calendar", name: "Kalender" },
  { id: "notes", name: "Catatan" },
  { id: "settings", name: "Pengaturan" },
];
const DOCK = [
  { id: "phone", name: "Telepon" },
  { id: "imessage", name: "Pesan" },
  { id: "wa", name: "WhatsApp" },
  { id: "music", name: "Musik" },
];
const badgeOf = (id) =>
  id === "imessage"
    ? unreadApp("imessage")
    : id === "wa"
      ? unreadApp("wa")
      : id === "phone"
        ? S.callLog.filter((c) => c.missed).length
        : 0;
function appIcon(a) {
  const ic =
    typeof ICONS[a.id] === "function" ? ICONS[a.id](now()) : ICONS[a.id];
  const n = badgeOf(a.id);
  return `<button class="app" data-app="${a.id}"><div class="icon">${ic}</div>${n ? `<span class="bdg">${n}</span>` : ""}<div class="lbl">${a.name}</div></button>`;
}
const agendaOn = (k) =>
  AGENDA.filter((e) => e[0] === k).sort((a, b) =>
    (a[1] || "00") < (b[1] || "00") ? -1 : 1,
  );
function home() {
  const t = now(),
    W = STORY.weather;
  const nx = agendaOn(dayKey(t))[0];
  const el = h(`<div class="home">${im(STORY.wallHome)}
    <div class="widgets">
      <div class="widget wcal"><div class="wd">${HARI[t.getDay()]}</div><div class="wn">${t.getDate()}</div>
        ${nx ? `<div class="we">${esc(nx[2])}<span>${nx[1].replace(":", ".")}</span></div>` : `<div class="we">Tidak ada acara<span>hari ini</span></div>`}</div>
      <div class="widget wwx"><svg class="ic" viewBox="0 0 24 24"><path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.4 2A3 3 0 0 0 7 18z" fill="#fff"/></svg><div class="c">${esc(W.city)} ➤</div><div class="t">${W.t}°</div><div class="d">${esc(W.s)}</div><div class="hl">T:${W.hi}° R:${W.lo}°</div></div>
    </div>
    <div class="hgrid">${APPS.map(appIcon).join("")}</div>
    <div class="spot"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>Cari</div>
    <div class="dock">${DOCK.map(appIcon).join("")}</div>
  </div>`);
  el.querySelectorAll(".app").forEach(
    (b) => (b.onclick = () => openApp(b.dataset.app)),
  );
  el.querySelector(".wcal").onclick = () => openApp("calendar");
  setBase(el);
}
// badge home + daftar chat diperbarui di tempat
function refreshHome() {
  const first = layersEl.firstElementChild;
  if (first && first.classList.contains("home"))
    first.querySelectorAll(".app").forEach((a) => {
      const n = badgeOf(a.dataset.app),
        b = a.querySelector(".bdg");
      if (n) {
        if (b) b.textContent = n;
        else
          a.querySelector(".icon").insertAdjacentHTML(
            "afterend",
            `<span class="bdg">${n}</span>`,
          );
      } else if (b) b.remove();
    });
  layersEl.querySelectorAll(".applist").forEach((k) => {
    const body = k.querySelector(".body"),
      html = listHTML(k.dataset.app);
    if (body._html === html) return;
    const st = body.scrollTop;
    body.innerHTML = html;
    body._html = html;
    body.scrollTop = st;
    wireList(k);
  });
}

// jendela generik
function win({
  title = "",
  back = "",
  cls = "",
  body = "",
  dark = true,
  sub = false,
  footer = "",
  act = "",
  big = "",
}) {
  const el =
    h(`<div class="win ${cls}${sub ? " sub" : ""}" ${dark ? 'data-dark="1"' : ""}>
    <div class="nav"><button class="back">${BACK}${esc(back)}</button><h2>${title}</h2><div class="act">${act}</div></div>
    <div class="body">${big ? `<div class="bigtitle">${big}</div>` : ""}${body}</div>${footer}
  </div>`);
  el.querySelector(".back").onclick = pop;
  return push(el);
}
function openApp(id, arg) {
  if (!S.unlocked) return;
  const t = topL();
  if (t && t.dataset.modal) return;
  popTo(1);
  ({
    photos: appPhotos,
    notes: appNotes,
    calendar: appCalendar,
    settings: appSettings,
    phone: appPhone,
    music: appMusic,
    imessage: (a) => appList("imessage", a),
    wa: (a) => appList("wa", a),
  })[id](arg);
}

// ---------- daftar chat (Pesan & WhatsApp) ----------
const SRCH =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/></svg>';
function rowHTML(c, app) {
  const m = lastMsg(c),
    u = unread(c);
  return `<button class="mrow" data-c="${c.id}">${app === "imessage" && u ? '<i class="mdot"></i>' : ""}${chatAv(c)}<div class="mt"><div class="m1"><b>${c.pinned ? '<i class="pinic">📌</i>' : ""}${esc(c.name)}</b><span class="${app === "wa" && u ? "new" : ""}">${relDay(m.ts)}</span></div><div class="m2">${esc(preview(c, m))}</div></div>${app === "wa" && u ? `<span class="wbadge">${u}</span>` : ""}</button>`;
}
function listHTML(app) {
  const cs = CHATS.filter((c) => inApp(c, app) && lastMsg(c)).sort(
    (a, b) =>
      (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || lastMsg(b).ts - lastMsg(a).ts,
  );
  const srch = `<div class="srch">${SRCH}Cari</div>`;
  if (app === "wa")
    return (
      srch +
      `<div class="chips"><span class="on">Semua</span><span>Belum Dibaca</span><span>Favorit</span><span>Grup</span></div><div class="mlist">${cs.map((c) => rowHTML(c, app)).join("")}</div>`
    );
  return (
    srch + `<div class="mlist">${cs.map((c) => rowHTML(c, app)).join("")}</div>`
  );
}
function wireList(el) {
  el.querySelectorAll("[data-c]").forEach(
    (b) => (b.onclick = () => openChat(b.dataset.c, el.dataset.app)),
  );
}
const WTABS = [
  [
    "Pembaruan",
    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  ],
  [
    "Panggilan",
    '<path d="M6 4h4l2 5-2.5 1.5a11 11 0 0 0 4 4L15 12l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2z"/>',
  ],
  [
    "Komunitas",
    '<circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.4"/><path d="M3 19c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5M15.5 14c3 0 5.5 1.600 5.500 4.500"/>',
  ],
  [
    "Chat",
    '<path d="M12 4C7 4 3 7.200 3 11c0 2.400 1.600 4.500 4 5.800L6.300 20l3.800-2.300c.6.100 1.200.2 1.900.2 5 0 9-3.100 9-7s-4-6.900-9-6.900z"/>',
    1,
  ],
  [
    "Pengaturan",
    '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/>',
  ],
];
function appList(app, open) {
  const wa = app === "wa";
  const el = win({
    cls: "applist " + app,
    big: wa ? "Chat" : "Pesan",
    body: listHTML(app),
    act: wa
      ? '<svg viewBox="0 0 24 24"><path d="M9 4l-1.500 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.500L15 4zm3 4.500a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9z"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/></svg>',
    footer: wa
      ? `<div class="wtabs">${WTABS.map(([n, p, on]) => `<div class="${on ? "on" : ""}"><svg viewBox="0 0 24 24">${p}</svg>${n}</div>`).join("")}</div>`
      : "",
  });
  el.dataset.app = app;
  el.querySelector(".back").innerHTML = wa ? "" : "<span>Edit</span>";
  el.querySelector(".body")._html = listHTML(app);
  wireList(el);
  if (open) openChat(open, app);
}

// ---------- chat ----------
const WA_COL = { Jagad: "#c4488c", Dika: "#d97a1e", Janitra: "#1f9d8a" };
const SEND_SVG =
  '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
function chatHTML(c, freshFrom = 1e9, wa = c.app === "wa") {
  const out = [];
  let day = null;
  c.items.forEach((it, i) => {
    const d = dayStart(it.ts).getTime(),
      prev = c.items[i - 1],
      next = c.items[i + 1];
    const newDay = d !== day;
    day = d;
    if (newDay)
      out.push(
        wa
          ? `<div class="wadate"><span>${esc(waDate(it.ts))}</span></div>`
          : `<div class="imdate"><b>${esc(shortDate(it.ts))}</b> ${hm(it.ts)}</div>`,
      );
    const me = it.who === "me",
      fr = i >= freshFrom ? " fresh" : "";
    const head = newDay || !prev || prev.who !== it.who,
      tail = !next || next.who !== it.who || dayStart(next.ts).getTime() !== d;
    const img = it.o.img ? `<div class="ph">${im(it.o.img)}</div>` : "";
    if (wa) {
      const nm =
        c.group && !me && head
          ? `<div class="wan" style="color:${WA_COL[it.who] || "#06a"}">${esc(it.who)}</div>`
          : "";
      out.push(
        `<div class="war ${me ? "me" : "them"}${head ? " head" : ""}${fr}"><div class="wab${it.o.img ? " pic" : ""}">${nm}${img}${it.text ? esc(it.text) : ""}<span class="wat">${hm(it.ts)}${me ? '<i class="tk">✓✓</i>' : ""}</span></div></div>`,
      );
    } else {
      out.push(
        `<div class="imr ${me ? "me" : "them"}${fr}"><div class="imb${tail ? " tail" : ""}${it.o.img ? " photo" : ""}">${img || esc(it.text)}</div></div>`,
      );
      if (me && !next) out.push(`<div class="imrd">Dibaca ${hm(it.ts)}</div>`);
    }
  });
  if (c.typing)
    out.push(
      wa
        ? ""
        : '<div class="imr them fresh"><div class="imb tail typing-b"><i></i><i></i><i></i></div></div>',
    );
  return out.join("");
}
function renderChat(el, c) {
  const body = el.querySelector(".body"),
    n = c.items.length;
  const near =
    body.scrollHeight - body.scrollTop - body.clientHeight < 90 ||
    el._n == null;
  body.innerHTML = chatHTML(
    c,
    el._n == null ? 1e9 : el._n,
    el.classList.contains("wapp"),
  );
  el._n = n;
  const sub = el.querySelector(".wahd small");
  if (sub)
    sub.textContent = c.typing ? "mengetik…" : c.group ? c.members : "online";
  if (near) {
    const go = () => (body.scrollTop = body.scrollHeight);
    go();
    setTimeout(go, 60);
    setTimeout(go, 330);
  }
}
const KB = {
  abc: [[..."qwertyuiop"], [..."asdfghjkl"], ["⇧", ..."zxcvbnm", "⌫"]],
  sym: [[..."1234567890"], [...'-/:;()$&@"'], [...".,?!'♡", "⌫"]],
  emo: [
    ["😊", "😂", "🥹", "😭", "😘", "🥰", "😍", "🤣"],
    ["💕", "😒", "😡", "🙄", "😴", "🤗", "👍", "🙏"],
    ["😅", "🤩", "😤", "😏", "🫶", "🤝", "💔", "⌫"],
  ],
};
function kbHTML(el) {
  const lay = el._lay || "abc",
    up = el._shift && lay === "abc";
  return (
    KB[lay]
      .map(
        (r) =>
          `<div class="kbr">${r.map((k) => `<span class="key ${k === "⇧" || k === "⌫" ? "fn" : ""}${k === "⇧" && el._shift ? " down" : ""}" data-key="${k}">${up && k.length === 1 ? k.toUpperCase() : k}</span>`).join("")}</div>`,
      )
      .join("") +
    `<div class="kbr"><span class="key fn wide" data-key="${lay === "sym" ? "ABC" : "123"}">${lay === "sym" ? "ABC" : "123"}</span><span class="key fn" data-key="🙂">🙂</span><span class="key space" data-key=" ">spasi</span><span class="key fn wide ret" data-key="kirim">kirim</span></div>`
  );
}
function openChat(id, app) {
  const c = chatById(id),
    wa = (app || c.app) === "wa";
  const backN = CHATS.filter(
    (x) => inApp(x, wa ? "wa" : "imessage") && x !== c,
  ).reduce((a, x) => a + unread(x), 0);
  const pic = chatAv(c),
    wall = (STORY.chatWall || {})[wa ? "wa" : "imessage"];
  const ico = (p) => `<svg viewBox="0 0 24 24">${p}</svg>`;
  const vid = ico(
      '<rect x="3" y="7" width="12" height="10" rx="2.500"/><path d="M15 11l6-3.500v9L15 13z"/>',
    ),
    tel = ico(
      '<path d="M6 4h4l2 5-2.500 1.500a11 11 0 0 0 4 4L15 12l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2z"/>',
    );
  const el =
    h(`<div class="win sub cwin ${wa ? "wapp" : "imsg"}${wall ? " haswall" : ""}" data-dark="1" data-chat="${c.id}" style="--dim:${STORY.chatWallDim ?? 0.3}">
    ${wall ? `<div class="cwall" style="background-image:url('${U(wall)}')"></div>` : ""}
    <div class="nav cnav"><button class="back">${BACK}<span>${backN || ""}</span></button>
      ${wa ? `<div class="wahd">${pic}<div><b>${esc(c.name)}</b><small></small></div></div><div class="act">${vid}${tel}</div>` : `<div class="imhd">${pic}<span>${esc(c.name)} ›</span></div><div class="act">${vid}</div>`}</div>
    <div class="body"></div>
    <div class="cin"><span class="plus">${ico('<path d="M12 5v14M5 12h14"/>')}</span><div class="cf" role="button" data-ph="${wa ? "Pesan" : "iMessage"}"></div><button class="csend">${SEND_SVG}</button></div>
    <div class="kb"></div>
  </div>`);
  el._buf = "";
  el._lay = "abc";
  el._shift = true;
  const f = el.querySelector(".cf"),
    kb = el.querySelector(".kb"),
    snd = el.querySelector(".csend");
  const draw = () => {
    f.textContent = el._buf;
    f.scrollLeft = f.scrollWidth;
    snd.classList.toggle("on", !!el._buf.trim());
  };
  const redraw = () => {
    kb.innerHTML = kbHTML(el);
  };
  const open = () => {
    el.classList.add("kb-open");
    f.classList.add("typing-now");
    redraw();
    const b = el.querySelector(".body");
    setTimeout(() => (b.scrollTop = b.scrollHeight), 260);
  };
  const shut = () => {
    el.classList.remove("kb-open");
    f.classList.remove("typing-now");
  };
  const send = () => {
    const text = el._buf.trim();
    if (!text) return;
    el._buf = "";
    el._shift = true;
    draw();
    redraw();
    c.items.push({ who: "me", text, o: {}, ts: now() });
    renderChat(el, c);
    markRead(c);
    if (c.onSend) c.onSend(text);
  };
  const press = (k, raw) => {
    keyClick(k === " ");
    if (k === "⌫") el._buf = el._buf.slice(0, -1);
    else if (k === "⇧") el._shift = !el._shift;
    else if (k === "123") el._lay = "sym";
    else if (k === "ABC") el._lay = "abc";
    else if (k === "🙂") el._lay = el._lay === "emo" ? "abc" : "emo";
    else if (k === "kirim") return send();
    else {
      el._buf += !raw && el._shift && el._lay === "abc" ? k.toUpperCase() : k;
      if (!raw) el._shift = false;
    }
    if (el._lay === "abc" && !el._buf) el._shift = true;
    draw();
    redraw();
  };
  el._press = press;
  kb.onclick = (e) => {
    const k = e.target.closest("[data-key]");
    if (k) press(k.dataset.key);
  };
  f.onclick = open;
  el.querySelector(".body").onclick = shut;
  snd.onclick = send;
  el.querySelector(".back").onclick = pop;
  push(el);
  renderChat(el, c);
  markRead(c);
}
// keyboard fisik (laptop): ngetik langsung di chat yang lagi kebuka
document.addEventListener("keydown", (e) => {
  const t = topL();
  if (
    !t ||
    !t.classList.contains("cwin") ||
    !t.classList.contains("kb-open") ||
    e.metaKey ||
    e.ctrlKey
  )
    return;
  if (e.key === "Backspace") {
    e.preventDefault();
    t._press("⌫");
  } else if (e.key === "Enter") {
    e.preventDefault();
    t._press("kirim");
  } else if (e.key.length === 1) {
    e.preventDefault();
    t._press(e.key, true);
  }
});

// ---------- alur: balas bebas → telepon → (ditolak) → balas bebas lagi → telepon wajib diangkat ----------
const sastraChat = () => chatById(DRIP.chat);
function typingThen(ms, fn) {
  const c = sastraChat(),
    draw = () => {
      const t = topL();
      if (t && t.dataset.chat === c.id) renderChat(t, c);
    };
  setTimeout(() => {
    c.typing = true;
    draw();
  }, 600);
  setTimeout(() => {
    c.typing = false;
    draw();
    fn();
  }, ms);
}
sastraChat().onSend = () => {
  if (S.stage === "await") {
    // balasan pertama → telepon (boleh ditolak)
    S.stage = "calling";
    typingThen(CALL_DELAY, () => incomingCall(false));
  } else if (S.stage === "await2") {
    // balasan setelah ditolak → "ANGKATT..." → telepon lagi (ga bisa ditolak)
    S.stage = "calling2";
    typingThen(1800, () => {
      deliver(sastraChat(), CALL_REPLY);
      setTimeout(() => incomingCall(true), 1500);
    });
  } else if (S.stage === "declined") S.queued = true; // nulis pas pesan marah masih masuk → diproses abis selesai
};
function incomingCall(forced) {
  const c = sastraChat();
  callScreen({
    who: c.person,
    name: c.name,
    dir: "in",
    lines: forced ? CALL_ACCEPT2 : CALL_ACCEPT,
    forced,
    onEnd: () => {
      S.stage = "done";
    },
    onDecline: declined,
  });
}
function declined() {
  S.stage = "declined";
  const c = sastraChat();
  let i = 0;
  const next = () => {
    deliver(c, CALL_DECLINE[i++]);
    if (i < CALL_DECLINE.length) return setTimeout(next, DRIP.gap);
    S.stage = "await2";
    if (S.queued) {
      S.queued = false;
      c.onSend();
    }
  };
  setTimeout(next, 1500);
}

// ---------- telepon ----------
let AC = null;
const ac = () => {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
  } catch (e) {}
  return AC;
};
document.addEventListener("pointerdown", ac, { once: true });
function tone(freqs, start, dur, vol = 0.06, type = "sine") {
  const a = ac();
  if (!a) return;
  try {
    const g = a.createGain();
    g.connect(a.destination);
    g.gain.setValueAtTime(0, a.currentTime + start);
    g.gain.linearRampToValueAtTime(vol, a.currentTime + start + 0.02);
    g.gain.setValueAtTime(
      vol,
      a.currentTime + start + Math.max(0.021, dur - 0.05),
    );
    g.gain.linearRampToValueAtTime(
      0,
      a.currentTime + start + Math.max(0.03, dur),
    );
    freqs.forEach((f) => {
      const o = a.createOscillator();
      o.type = type;
      o.frequency.value = f;
      o.connect(g);
      o.start(a.currentTime + start);
      o.stop(a.currentTime + start + dur + 0.05);
    });
  } catch (e) {}
}
function ringback() {
  let on = true;
  const loop = () => {
    if (!on) return;
    tone([440, 480], 0, 1.0, 0.07);
    setTimeout(loop, 3000);
  };
  loop();
  return () => (on = false);
}
// ringtone: aud/ringtone.mp3 kalau ada, kalau gak ada pake marimba sintetis
function marimba(f, at, vol = 0.12) {
  const a = ac();
  if (!a) return;
  const t = a.currentTime + at;
  [
    [1, vol],
    [4, vol * 0.22],
    [10, vol * 0.05],
  ].forEach(([m, v]) => {
    const o = a.createOscillator(),
      g = a.createGain();
    o.type = "sine";
    o.frequency.value = f * m;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (m === 1 ? 0.9 : 0.25));
    o.connect(g);
    g.connect(a.destination);
    o.start(t);
    o.stop(t + 1);
  });
}
function ringtone() {
  let on = true,
    file = null;
  try {
    file = sfx("ringtone");
    file.loop = true;
    file.currentTime = 0;
  } catch (e) {}
  const synth = () => {
    const seq = [
      [0, 784],
      [0.15, 1047],
      [0.3, 1175],
      [0.45, 1047],
      [0.6, 784],
      [0.9, 880],
      [1.05, 1175],
      [1.2, 1319],
      [1.5, 1175],
      [1.65, 880],
    ];
    const loop = () => {
      if (!on) return;
      seq.forEach(([t, f]) => marimba(f, t));
      setTimeout(loop, 2600);
    };
    loop();
  };
  if (file) file.play().catch(() => synth());
  else synth();
  return () => {
    on = false;
    if (file) file.pause();
  };
}
const endTone = () => {
  tone([480], 0, 0.18, 0.06);
  tone([480], 0.25, 0.18, 0.06);
  tone([480], 0.5, 0.18, 0.06);
};
let keyBuf = null,
  keyBufTried = false,
  noiseBuf = null;
function loadKeyBuf() {
  if (keyBufTried) return;
  keyBufTried = true;
  const a = ac();
  if (!a) return;
  fetch("aud/keyclick.mp3")
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
    .then((b) => a.decodeAudioData(b))
    .then((buf) => (keyBuf = buf))
    .catch(() => {});
}
function keyClick(big) {
  const a = ac();
  if (!a) return;
  loadKeyBuf();
  try {
    const t = a.currentTime;
    if (keyBuf) {
      const src = a.createBufferSource();
      src.buffer = keyBuf;
      src.playbackRate.value = big ? 0.92 : 1 + (Math.random() - 0.5) * 0.06;
      const g = a.createGain();
      g.gain.value = 0.9;
      src.connect(g);
      g.connect(a.destination);
      src.start(t);
      return;
    }
    // badan "tok": sinus yg nadanya turun cepet
    const o = a.createOscillator(),
      og = a.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(big ? 1100 : 1700 + Math.random() * 150, t);
    o.frequency.exponentialRampToValueAtTime(big ? 500 : 700, t + 0.018);
    og.gain.setValueAtTime(0, t);
    og.gain.linearRampToValueAtTime(big ? 0.22 : 0.16, t + 0.001);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    o.connect(og);
    og.connect(a.destination);
    o.start(t);
    o.stop(t + 0.04);
    // "klik" tipis di depan
    if (!noiseBuf) {
      noiseBuf = a.createBuffer(1, a.sampleRate * 0.006, a.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    }
    const n = a.createBufferSource();
    n.buffer = noiseBuf;
    const hp = a.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 5000;
    const ng = a.createGain();
    ng.gain.value = 0.05;
    n.connect(hp);
    hp.connect(ng);
    ng.connect(a.destination);
    n.start(t);
  } catch (e) {}
}
function callScreen({
  who,
  name,
  dir = "out",
  lines = [],
  onEnd,
  onDecline,
  replay = false,
  forced = false,
}) {
  musicPause();
  name = name || who;
  let entry = null;
  if (!replay) {
    entry = {
      who,
      name,
      t: now().getTime(),
      out: dir !== "in",
      missed: dir === "in",
    };
    if (lines.length > 1) entry.lines = lines;
    S.callLog.unshift(entry);
    S.callLog = S.callLog.slice(0, 40);
  }
  let stopRing = null,
    timer = null,
    i = -1;
  const el =
    h(`<div class="call" data-nostatus="" data-modal="1"><div class="blurbg" style="background-image:url('${(PEOPLE[who] || {}).av || ""}')"></div>
    <div class="cs">${dir === "in" ? "seluler" : "memanggil..."}</div><h2>${esc(name)}</h2>${av(who)}
    <div class="sub"></div><div class="taphint"></div>
    <div class="cbtns">${dir === "in" && !replay ? `<button class="no"${forced ? " disabled" : ""}><i>${SVG_PHONE}</i>Tolak</button><button class="yes"><i>${SVG_PHONE}</i>Terima</button>` : `<span></span><button class="no end"><i>${SVG_PHONE}</i>Akhiri</button><span></span>`}</div>
  </div>`);
  const cs = el.querySelector(".cs"),
    sub = el.querySelector(".sub"),
    hint = el.querySelector(".taphint");
  const finish = (msg = "Panggilan berakhir") => {
    if (stopRing) stopRing();
    clearInterval(timer);
    endTone();
    cs.textContent = msg;
    el.querySelector(".cbtns").innerHTML = "";
    sub.innerHTML = "";
    hint.textContent = "";
    el.onclick = null;
    setTimeout(() => {
      el.remove();
      syncChrome();
      refreshHome();
      onEnd && onEnd();
    }, 1300);
  };
  const next = () => {
    i++;
    if (i >= lines.length) return finish();
    const [w, t] = lines[i];
    sub.innerHTML = `<p class="${w}"><small>${w === "k" ? "Kaisar" : esc(name)}</small>${esc(t)}</p>`;
    hint.textContent = "ketuk buat lanjut";
  };
  const answered = () => {
    if (stopRing) stopRing();
    stopRing = null;
    if (entry) entry.missed = false;
    el.querySelector(".cbtns").innerHTML =
      `<span></span><button class="no end"><i>${SVG_PHONE}</i>Akhiri</button><span></span>`;
    el.querySelector(".end").onclick = (e) => {
      e.stopPropagation();
      finish();
    };
    let s = 0;
    cs.textContent = "00:00";
    timer = setInterval(() => {
      s++;
      cs.textContent = `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
    }, 1000);
    next();
    setTimeout(() => {
      el.onclick = (e) => {
        if (!e.target.closest("button")) next();
      };
    }, 700);
  };
  if (replay) setTimeout(answered, 300);
  else if (dir === "in") {
    stopRing = ringtone();
    el.querySelector(".yes").onclick = (e) => {
      e.stopPropagation();
      answered();
    };
    el.querySelector(".no").onclick = (e) => {
      e.stopPropagation();
      if (forced) return;
      stopRing();
      stopRing = null;
      el.remove();
      syncChrome();
      refreshHome();
      onDecline ? onDecline() : onEnd && onEnd();
    };
  } else {
    stopRing = ringback();
    el.querySelector(".end").onclick = (e) => {
      e.stopPropagation();
      finish();
    };
    setTimeout(() => {
      if (el.isConnected) finish("Tidak menjawab");
    }, 5600); // telepon keluar: ga diangkat
  }
  push(el);
  return el;
}
function appPhone() {
  const calls = [
    ...S.callLog.map((c) => ({
      who: c.who,
      name: c.name,
      what: c.missed ? "tak terjawab" : "seluler",
      t: c.t,
      out: c.out,
      missed: c.missed && !c.out,
      lines: c.lines,
    })),
    ...CALLS.map((c) => ({
      ...c,
      name: c.name || c.who,
      t: new Date(c.t).getTime(),
      what: c.missed ? "tak terjawab" : "seluler",
    })),
  ].sort((a, b) => b.t - a.t);
  const nm = (w) => (PEOPLE[w] && PEOPLE[w].name) || w;
  const el = win({
    cls: "notepage",
    big: "Favorit",
    back: "",
    body: `<div style="margin:0 0 18px 16px">${FAV.map((p) => `<div class="row callrow" data-p="${p}" style="padding:8px 16px 8px 0">${av(p, "sm rd")}<div class="rt"><div class="r1"><b style="font-weight:500">${esc(nm(p))}</b></div><div class="r2" style="font-size:13px">seluler</div></div><span style="color:#007aff;font-size:20px">ⓘ</span></div>`).join("")}</div>
    <div class="bigtitle" style="font-size:24px">Terkini</div><div style="margin:0 0 0 16px">${calls.length ? calls.map((c, ci) => `<div class="row callrow" data-p="${c.who}" data-ci="${ci}" style="padding:10px 16px 10px 0"><div class="rt"><div class="r1"><b style="font-weight:600;${c.missed ? "color:#ff3b30" : ""}">${esc(c.name)}</b><span>${relDay(new Date(c.t))}</span></div><div class="r2">${c.lines && !c.missed ? '<span class="replay">▶ putar ulang</span>' : ""}${c.out ? "↗ " : ""}${esc(c.what)}</div></div></div>`).join("") : '<div style="padding:12px 0;color:#8e8e93">Belum ada panggilan</div>'}</div>`,
  });
  el.querySelector(".back").innerHTML = "<span>Edit</span>";
  el.querySelectorAll(".callrow").forEach(
    (r) =>
      (r.onclick = () => {
        const c = r.dataset.ci != null ? calls[+r.dataset.ci] : null;
        if (c && c.lines && !c.missed)
          callScreen({
            who: c.who,
            name: c.name,
            dir: "in",
            lines: c.lines,
            replay: true,
          });
        else callScreen({ who: r.dataset.p, name: nm(r.dataset.p) });
      }),
  );
}

// ---------- Foto ----------
function appPhotos() {
  const vis = PHOTOS.map((p) => ({ ...p, t: new Date(p.ts) }))
    .filter((p) => p.t <= now())
    .sort((a, b) => b.t - a.t);
  const groups = [];
  vis.forEach((p) => {
    const k = `${BULAN[p.t.getMonth()]} ${p.t.getFullYear()}`;
    let g = groups.find((g) => g.k === k);
    if (!g) groups.push((g = { k, items: [] }));
    g.items.push(p);
  });
  const el = win({
    cls: "photos",
    body: `<div class="bigtitle">Pustaka</div><div class="cnt">${vis.length} Foto</div>${groups.map((g) => `<div class="mon">${g.k}</div><div class="pgrid">${g.items.map((p) => `<div class="ptile" data-i="${vis.indexOf(p)}">${im(p.img)}</div>`).join("")}</div>`).join("")}`,
    act: '<span style="color:#007aff;font-size:17px">Pilih</span>',
    footer:
      '<div class="seg"><span>Tahun</span><span>Bulan</span><span class="on">Semua</span></div>',
  });
  el.querySelector(".back").style.visibility = "hidden";
  el.querySelectorAll(".ptile").forEach(
    (t) => (t.onclick = () => viewPhoto(vis[+t.dataset.i])),
  );
}
function viewPhoto(p) {
  const t = p.t;
  const el = h(
    `<div class="win pview sub"><div class="nav"><button class="back" style="color:#fff">${BACK}</button><h2>${t.getDate()} ${BULAN[t.getMonth()]} ${t.getFullYear()}<small>${hm(t)}</small></h2></div><div class="pbig">${im(p.img)}</div></div>`,
  );
  el.querySelector(".back").onclick = pop;
  push(el);
}

// ---------- Catatan ----------
function appNotes(open) {
  const vis = NOTES.slice().sort((a, b) => new Date(b.ts) - new Date(a.ts));
  const rows = vis
    .map(
      (n) =>
        `<button class="row" data-n="${n.id}"><div class="rt"><div class="r1"><b>${esc(n.title)}</b></div><div class="r2"><span style="color:#3c3c43">${esc(relDay(new Date(n.ts)))}</span>&nbsp; ${esc(n.body.split("\n")[0])}</div></div></button>`,
    )
    .join("");
  const el = win({
    cls: "notes",
    back: "Folder",
    big: "Catatan",
    body: `<div class="list">${rows}</div><div style="text-align:center;color:#8e8e93;font-size:12px">${vis.length} Catatan</div>`,
  });
  el.querySelectorAll("[data-n]").forEach(
    (b) => (b.onclick = () => openNote(b.dataset.n)),
  );
  if (open) openNote(open);
}
function openNote(id) {
  const n = NOTES.find((x) => x.id === id),
    d = new Date(n.ts);
  win({
    cls: "notes notepage",
    back: "Catatan",
    sub: true,
    body: `<div class="notebody"><div class="nd">${longDate(d)} pukul ${hm(d)}</div><h3>${esc(n.title)}</h3>${esc(n.body)}</div>`,
  });
}

// ---------- Kalender ----------
function appCalendar() {
  const t = now();
  let y = t.getFullYear(),
    m = t.getMonth(),
    sel = dayKey(t);
  const el = win({
    cls: "notepage cal",
    back: "",
    body: '<div class="calwrap"></div>',
  });
  const tm = (e) =>
    e[1]
      ? e[1].replace(":", ".") + (e[6] ? "–" + e[6].replace(":", ".") : "")
      : "seharian";
  const draw = () => {
    const first = new Date(y, m, 1).getDay(),
      days = new Date(y, m + 1, 0).getDate();
    let cells = "<span></span>".repeat(first);
    for (let d = 1; d <= days; d++) {
      const k = `${y}-${pad(m + 1)}-${pad(d)}`,
        dow = (first + d - 1) % 7;
      cells += `<span data-k="${k}" class="${k === dayKey(t) ? "today" : ""} ${k === sel ? "sel" : ""} ${dow === 0 || dow === 6 ? "wk" : ""} ${agendaOn(k).length ? "ev" : ""}"><b>${d}</b></span>`;
    }
    const sd = new Date(sel + "T00:00"),
      list = agendaOn(sel);
    el.querySelector(".back").innerHTML = `${BACK}${y}`;
    el.querySelector(".calwrap").innerHTML =
      `<div class="calbar"><div class="bigtitle" style="color:#ff3b30;padding:0">${BULAN[m]}</div><div><button class="cm" data-d="-1">‹</button><button class="cm" data-d="1">›</button></div></div>
      <div class="calhead">${["M", "S", "S", "R", "K", "J", "S"].map((d) => `<span>${d}</span>`).join("")}</div><div class="calgrid">${cells}</div>
      <div class="caldate">${longDate(sd)}</div>
      ${list.length ? list.map((e, i) => `<div class="evrow" data-e="${i}"><i style="background:${e[3]}"></i><div style="flex:1"><div class="et">${esc(e[2])}</div>${e[4] ? `<div class="es">${esc(e[4])}</div>` : ""}</div><div class="es" style="text-align:right">${tm(e)}</div>${e[5] ? `<span class="evth">${im(e[5])}</span>` : ""}</div>`).join("") : '<div style="padding:14px 16px;color:#8e8e93">Tidak Ada Acara</div>'}`;
    el.querySelectorAll("[data-k]").forEach(
      (c) =>
        (c.onclick = () => {
          sel = c.dataset.k;
          draw();
        }),
    );
    el.querySelectorAll(".cm").forEach(
      (b) =>
        (b.onclick = () => {
          m += +b.dataset.d;
          if (m < 0) {
            m = 11;
            y--;
          }
          if (m > 11) {
            m = 0;
            y++;
          }
          draw();
        }),
    );
    el.querySelectorAll(".evrow").forEach(
      (r) =>
        (r.onclick = () => {
          const e = list[+r.dataset.e];
          const d = h(
            `<div class="evdet"><div class="card"><div class="et" style="font-size:20px;font-weight:600"><i style="background:${e[3]}"></i>${esc(e[2])}</div><div class="es" style="margin-top:4px;color:#8e8e93">${longDate(sd)} · ${tm(e)}</div>${e[4] ? `<div style="margin-top:6px">${esc(e[4])}</div>` : ""}${e[5] ? `<div class="big">${im(e[5])}</div>` : ""}</div></div>`,
          );
          d.onclick = (ev) => {
            if (ev.target === d) d.remove();
          };
          el.appendChild(d);
        }),
    );
  };
  draw();
}

// ---------- Pengaturan ----------
function appSettings() {
  const rows = [
    ["#ff9500", "Mode Pesawat", ""],
    ["#007aff", "Wi-Fi", "Rumah_5G"],
    ["#007aff", "Bluetooth", "Nyala"],
    ["#34c759", "Seluler", ""],
  ];
  const rows2 = [
    ["#ff3b30", "Notifikasi", ""],
    ["#5856d6", "Fokus", ""],
    ["#8e8e93", "Umum", ""],
    ["#007aff", "Tampilan & Kecerahan", ""],
    ["#34c759", "Face ID & Kode Sandi", ""],
    ["#34c759", "Baterai", `${Math.round(battery() * 100)}%`],
  ];
  const r = (arr) =>
    arr
      .map(
        ([c, t, v]) =>
          `<div class="row"><div class="sicon" style="background:${c}"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/></svg></div><div class="rt"><div class="r1">${t}<span>${v}</span></div></div>${CHEV}</div>`,
      )
      .join("");
  win({
    big: "Pengaturan",
    body: `<div class="list"><div class="row" style="padding:10px 16px">${av("Kaisar", "rd")}<div class="rt"><div class="r1" style="font-size:20px">Kaisar</div><div class="r2" style="font-size:13px">Akun Apple, iCloud, dan lainnya</div></div>${CHEV}</div></div><div class="list">${r(rows)}</div><div class="list">${r(rows2)}</div>`,
  });
  topL().querySelector(".back").remove();
}

// ---------- Musik (file audio lokal, tampilan ala template) ----------
let music = null,
  musicIdx = -1;
const musicPause = () => {
  if (music) music.pause();
};
// cover: kolom ke-4 (path/link/Google Drive); kosong → thumbnail YouTube dari ID kolom ke-5; kosong juga → kotak abu-abu
const songArt = (s) =>
  U(s[3]) || (s[4] ? `https://i.ytimg.com/vi/${s[4]}/hqdefault.jpg` : "");
function appMusic() {
  const el = win({
    cls: "music",
    back: "Perpustakaan",
    body: `<div class="mhead"><div class="mart">${im(ALBUM.cover)}</div><h3>${esc(ALBUM.name)}</h3><div class="by">${esc(ALBUM.by)}</div><div style="color:#8e8e93;font-size:13px">Diperbarui ${relDay(new Date(ALBUM.updated))}</div><div class="mbtns"><div class="mplayall">▶ Putar</div><div class="mshuf">⤮ Acak</div></div></div>
    <div class="list" style="margin:0">${SONGS.map((s, i) => `<div class="row song" data-i="${i}"><img class="sart" src="${songArt(s)}" alt="" onerror="this.style.visibility='hidden'"><div class="rt"><div class="r1" style="font-size:16px">${esc(s[0])}</div><div class="r2" style="font-size:13px">${esc(s[1])}</div></div><span class="eq">⋯</span></div>`).join("")}</div><div style="height:90px"></div>`,
    footer:
      '<div class="mini" style="display:none"><img class="mart2" alt="" onerror="this.style.visibility=\'hidden\'"><div class="mt2"><b></b><span></span><div class="mprog"><i></i></div></div><button class="mpp">❚❚</button><button class="mnext">⏭</button></div>',
  });
  const mini = el.querySelector(".mini");
  const sync = () => {
    el.querySelectorAll(".song").forEach((r) =>
      r.classList.toggle("now", +r.dataset.i === musicIdx),
    );
    if (musicIdx < 0) return;
    const s = SONGS[musicIdx];
    const art = mini.querySelector(".mart2");
    art.style.visibility = "";
    art.src = songArt(s);
    mini.style.display = "";
    mini.querySelector("b").textContent = s[0];
    mini.querySelector("span").textContent = s[1];
    mini.querySelector(".mpp").textContent =
      music && !music.paused ? "❚❚" : "▶";
  };
  const play = (i) => {
    if (music) music.pause();
    musicIdx = (i + SONGS.length) % SONGS.length;
    music = new Audio(SONGS[musicIdx][2]);
    music.ontimeupdate = () => {
      const b = document.querySelector(".mini .mprog i");
      if (b && music.duration)
        b.style.width = (music.currentTime / music.duration) * 100 + "%";
    };
    music.onended = () => {
      play(musicIdx + 1);
    };
    music.onerror = () => {
      toast({
        icon: ICONS.music,
        title: "Musik",
        body: "File lagunya belum ada: " + SONGS[musicIdx][2],
        ms: 2500,
      });
    };
    music.play().catch(() => {});
    sync();
  };
  el.querySelectorAll(".song").forEach(
    (r) => (r.onclick = () => play(+r.dataset.i)),
  );
  el.querySelector(".mplayall").onclick = () => play(0);
  el.querySelector(".mshuf").onclick = () =>
    play(Math.floor(Math.random() * SONGS.length));
  mini.querySelector(".mpp").onclick = () => {
    if (!music) return;
    music.paused ? music.play() : music.pause();
    sync();
  };
  mini.querySelector(".mnext").onclick = () => play(musicIdx + 1);
  sync();
}

setInterval(tickStatus, 1000);

// ---------- gesture ala iPhone: swipe up dari bawah = home, swipe dari kiri = back (ngikutin jari) ----------
(() => {
  const scr = $("#screen");
  let g = null;
  const pos = (e) => {
    const r = scr.getBoundingClientRect(),
      sc = r.height / scr.offsetHeight;
    return [(e.clientX - r.left) / sc, (e.clientY - r.top) / sc];
  };
  scr.addEventListener("pointerdown", (e) => {
    const [x, y] = pos(e);
    const t = topL();
    g = {
      x,
      y,
      bottom: y > scr.offsetHeight - 46,
      left: x < 22,
      t,
      moved: false,
    };
  });
  scr.addEventListener("pointermove", (e) => {
    if (!g || !g.t || g.t.dataset.modal) return;
    const [x, y] = pos(e);
    const dx = x - g.x,
      dy = y - g.y;
    if (g.left && g.t.classList.contains("sub") && dx > 6) {
      g.moved = true;
      g.t.style.transition = "none";
      g.t.style.transform = `translateX(${Math.max(0, dx)}px)`;
    } else if (
      g.bottom &&
      S.unlocked &&
      layersEl.children.length > 1 &&
      dy < -6
    ) {
      g.moved = true;
      const k = Math.min(1, -dy / 500);
      g.t.style.transition = "none";
      g.t.style.transformOrigin = "50% 80%";
      g.t.style.transform = `translateY(${dy * 0.45}px) scale(${1 - k * 0.45})`;
      g.t.style.borderRadius = `${k * 60}px`;
    }
  });
  // tap biasa di zona gesture: terusin ke elemen di bawahnya
  const passTap = (e) => {
    const z = e.target;
    if (!z.classList || !z.classList.contains("gz")) return;
    document
      .querySelectorAll(".gz")
      .forEach((x) => (x.style.pointerEvents = "none"));
    const under = document.elementFromPoint(e.clientX, e.clientY);
    document
      .querySelectorAll(".gz")
      .forEach((x) => (x.style.pointerEvents = ""));
    if (under) under.click();
  };
  const end = (e) => {
    if (!g) return;
    const st = g;
    g = null;
    const t = st.t;
    if (
      !st.moved &&
      e.type === "pointerup" &&
      Math.abs(pos(e)[1] - st.y) < 10 &&
      Math.abs(pos(e)[0] - st.x) < 10
    )
      passTap(e);
    if (!t) return;
    const [x, y] = pos(e);
    const dx = x - st.x,
      dy = y - st.y;
    const snap = () => {
      t.style.transition =
        "transform .22s cubic-bezier(.2,.8,.2,1), border-radius .22s";
      t.style.transform = "";
      t.style.borderRadius = "";
      setTimeout(() => {
        t.style.transition = "";
      }, 240);
    };
    if (t.dataset.modal) return;
    if (st.bottom && dy < -50) {
      if (t.classList.contains("cam")) return pop();
      if (!S.unlocked) return passcode();
      if (layersEl.children.length > 1) {
        t.style.transition = "";
        return popTo(1);
      }
      return;
    }
    if (st.left && t.classList.contains("sub") && st.moved) {
      if (dx > 90) {
        t.style.transition = "transform .2s ease-out";
        t.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (t.parentNode === layersEl) {
            t.remove();
            syncChrome();
            refreshUnder();
          }
        }, 200);
      } else snap();
      return;
    }
    if (st.moved) snap();
  };
  scr.addEventListener("pointerup", end);
  scr.addEventListener("pointercancel", end);
})();

// ---------- fit ----------
// HP di dalem HP: frame iPhone selalu keliatan, di-scale biar muat (termasuk pas di-install / fullscreen)
function fit() {
  const st = $("#stage"),
    m = innerWidth < 500 ? 16 : 24;
  const s = Math.min(
    1.15,
    (st.clientHeight - m) / 876,
    (st.clientWidth - m) / 417,
  );
  $("#phone").style.transform = `translate(-50%,-50%) scale(${s})`;
}
if (window.visualViewport) visualViewport.addEventListener("resize", fit);
addEventListener("resize", fit);
fit();
intro();
intro();
