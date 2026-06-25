"use client";
import { useState } from "react";

export default function SchoolHive() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const faqs = [
    { q: "What is SchoolHive?", a: "SchoolHive is a complete school management platform that helps institutions digitise fee collection, streamline student records, and build long-term parent relationships through automated communication and real-time analytics." },
    { q: "Who can use SchoolHive?", a: "Any educational institution — from small coaching centres to large multi-branch schools and colleges — can use SchoolHive. Our platform scales to your size and adapts to your fee structure." },
    { q: "How does the Fee Management module work?", a: "The Fee Management module lets you define unlimited fee heads (tuition, hostel, transport, etc.), assign them per class or student, collect payments online or at the counter, and generate instant digital receipts with full audit trails." },
    { q: "What makes the Smart Reminders engine unique?", a: "Our engine sends contextual, personalised reminders via WhatsApp, SMS, and email — automatically triggered by due dates, overdue status, or custom rules you set. Parents receive the right message at the right time." },
    { q: "Is SchoolHive customisable for different institution types?", a: "Yes. SchoolHive supports custom fee structures, multi-branch management, multi-currency, and role-based access — making it equally powerful for a single school or a large educational group." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        /* ── TOKENS ── */
        :root {
          --bg: #0a0a0a;
          --bg2: #111111;
          --bg3: #161616;
          --border: rgba(255,255,255,0.08);
          --blue: #4f8ef7;
          --blue2: #3b7de8;
          --blue-glow: rgba(79,142,247,0.25);
          --text: #ffffff;
          --muted: rgba(255,255,255,0.55);
          --muted2: rgba(255,255,255,0.35);
          --card: #141414;
          --card2: #1a1a1a;
          --radius: 12px;
          --radius2: 8px;
        }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

        /* ── NAV ── */
        .nav {
          position: sticky; top: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 60px;
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
          section , footer ,.footer-brand-big ,.logo-strip{
          background :#000
          }
        .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .nav-logo-mark {
          width: 28px; height: 28px; border-radius: 7px;
          background: linear-gradient(135deg, var(--blue), #6c63ff);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 13px; color: #fff;
        }
        .nav-logo-name { font-size: 0.95rem; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
        .nav-logo-name span { color: var(--blue); }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-link { color: var(--muted); font-size: 0.82rem; font-weight: 500; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .nav-btn {
          background: var(--blue); color: #fff; border: none;
          padding: 8px 18px; border-radius: 7px; font-size: 0.8rem; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 16px var(--blue-glow);
        }
        .nav-btn:hover { background: var(--blue2); transform: translateY(-1px); }

        /* ── HERO ── */
        .hero {
          min-height: 88vh; display: flex; align-items: center; justify-content: center;
          text-align: center; position: relative; overflow: hidden;
          padding: 80px 48px 60px;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,142,247,0.10) 0%, transparent 70%);
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 40% 40% at 20% 60%, rgba(108,99,255,0.07) 0%, transparent 60%),
                      radial-gradient(ellipse 40% 40% at 80% 70%, rgba(79,142,247,0.07) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-inner { position: relative; z-index: 1; max-width: 760px; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid var(--border); border-radius: 50px;
          padding: 5px 14px; font-size: 0.72rem; color: var(--muted); margin-bottom: 28px;
          background: rgba(255,255,255,0.03);
        }
        .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800; line-height: 1.1; letter-spacing: -2px; color: #fff; margin-bottom: 20px; }
        .hero h1 .line2 { color: var(--blue); }
        .hero-sub { color: var(--muted); font-size: 1rem; line-height: 1.75; max-width: 520px; margin: 0 auto 36px; }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--blue); color: #fff; padding: 12px 26px;
          border-radius: 9px; font-size: 0.9rem; font-weight: 600;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 8px 28px var(--blue-glow);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 36px var(--blue-glow); }

        /* floating mock panels on sides */
        .hero-floats { position: absolute; inset: 0; pointer-events: none; }
        .float-panel {
          position: absolute; background: var(--card);
          border: 1px solid var(--border); border-radius: var(--radius);
          padding: 14px 16px;
        }
        .float-left { left: 2%; top: 50%; transform: translateY(-50%); width: 180px; }
        .float-right { right: 2%; top: 50%; transform: translateY(-50%); width: 160px; }
        .fp-label { font-size: 0.6rem; color: var(--muted2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
        .fp-ring { width: 70px; height: 70px; border-radius: 50%; border: 5px solid #1e2a3a; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; position: relative; }
        .fp-ring-fill { position: absolute; inset: -5px; border-radius: 50%; border: 5px solid transparent; border-top-color: var(--blue); border-right-color: var(--blue); }
        .fp-pct { font-size: 1.1rem; font-weight: 800; color: #fff; }
        .fp-sub { font-size: 0.58rem; color: var(--muted2); text-align: center; }
        .fp-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border); }
        .fp-row:last-child { border-bottom: none; }
        .fp-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .fp-name { font-size: 0.6rem; color: var(--muted); margin-left: 6px; flex: 1; }
        .fp-val { font-size: 0.6rem; color: #fff; font-weight: 600; }
        .bar-group { margin-top: 8px; }
        .bar-label { font-size: 0.58rem; color: var(--muted2); margin-bottom: 4px; }
        .bar-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 99px; margin-bottom: 6px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 99px; background: var(--blue); }

        /* ── DASHBOARD SECTION ── */
        .dash-section { padding: 40px 48px 80px; }
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; }
        .dash-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 22px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .dc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .dc-title { font-size: 0.8rem; font-weight: 700; color: #fff; }
        .dc-tag { background: rgba(79,142,247,0.15); border: 1px solid rgba(79,142,247,0.2); color: var(--blue); font-size: 0.6rem; font-weight: 600; padding: 3px 8px; border-radius: 4px; }
        .dc-nav { display: flex; gap: 6px; margin-bottom: 16px; }
        .dc-nav-item { font-size: 0.65rem; color: var(--muted2); padding: 4px 10px; border-radius: 5px; cursor: pointer; }
        .dc-nav-item.active { background: rgba(79,142,247,0.15); color: var(--blue); }
        .mini-chart { height: 60px; display: flex; align-items: flex-end; gap: 4px; margin-bottom: 12px; }
        .mini-bar { flex: 1; border-radius: 3px 3px 0 0; background: rgba(79,142,247,0.2); }
        .mini-bar.hi { background: var(--blue); }
        .mini-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ms-box { background: var(--bg3); border-radius: 8px; padding: 10px; border: 1px solid var(--border); }
        .ms-label { font-size: 0.58rem; color: var(--muted2); margin-bottom: 4px; }
        .ms-val { font-size: 0.9rem; font-weight: 700; color: #fff; }
        .ms-val.blue { color: var(--blue); }
        .ms-val.green { color: #4ade80; }
        .dc-summary-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); }
        .dc-summary-row:last-child { border-bottom: none; }
        .dcr-label { font-size: 0.65rem; color: var(--muted); }
        .dcr-val { font-size: 0.7rem; font-weight: 700; color: #fff; }
        .dist-bars { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
        .db-row { display: flex; align-items: center; gap: 10px; }
        .db-name { font-size: 0.6rem; color: var(--muted2); width: 60px; flex-shrink: 0; }
        .db-track { flex: 1; height: 5px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
        .db-fill { height: 100%; border-radius: 99px; }
        .db-num { font-size: 0.6rem; color: var(--muted2); width: 28px; text-align: right; }
        .ring-card { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .big-ring { position: relative; width: 100px; height: 100px; margin: 12px auto; }
        .big-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .big-ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .big-ring-pct { font-size: 1.4rem; font-weight: 800; color: #fff; line-height: 1; }
        .big-ring-label { font-size: 0.55rem; color: var(--muted2); }
        .ring-legend { display: flex; flex-direction: column; gap: 7px; margin-top: 8px; width: 100%; }
        .rl-item { display: flex; align-items: center; gap: 8px; }
        .rl-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .rl-name { font-size: 0.62rem; color: var(--muted); flex: 1; }
        .rl-val { font-size: 0.62rem; color: #fff; font-weight: 600; }

        /* ── LOGO STRIP ── */
        .logo-strip { padding: 48px 48px; text-align: center; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .ls-label { font-size: 0.68rem; color: var(--muted2); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 28px; }
        .ls-logos { display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap; }
        .ls-logo { font-size: 0.95rem; font-weight: 800; color: rgba(255,255,255,0.25); letter-spacing: -0.5px; }

        /* ── WHY US ── */
        .why-section { padding: 80px 48px; text-align: center; }
        .section-pill {
          display: inline-block; border: 1px solid var(--border); border-radius: 50px;
          padding: 5px 16px; font-size: 0.7rem; color: var(--muted); margin-bottom: 20px;
          background: rgba(255,255,255,0.02);
        }
        .section-h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -1px; margin-bottom: 14px; }
        .section-h2 .accent { color: var(--blue); }
        .section-sub { color: var(--muted); font-size: 0.9rem; line-height: 1.7; max-width: 480px; margin: 0 auto 56px; }
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 860px; margin: 0 auto; text-align: left; }
        .why-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .why-card:hover { border-color: rgba(79,142,247,0.3); }
        .why-card-img {
          height: 160px; background: var(--bg3);
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid var(--border); position: relative; overflow: hidden;
        }
        .why-card-body { padding: 22px; }
        .why-card-title { font-size: 0.95rem; font-weight: 700; color: var(--blue); margin-bottom: 10px; }
        .why-card-text { font-size: 0.8rem; color: var(--muted); line-height: 1.7; }

        /* mini UI inside why cards */
        .mini-ui { width: 100%; height: 100%; padding: 14px; display: flex; flex-direction: column; gap: 6px; }
        .mui-row { display: flex; align-items: center; gap: 8px; padding: 7px 10px; background: rgba(255,255,255,0.04); border-radius: 7px; border: 1px solid var(--border); }
        .mui-icon { width: 20px; height: 20px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; flex-shrink: 0; }
        .mui-text { font-size: 0.62rem; color: var(--muted); flex: 1; }
        .mui-badge { font-size: 0.55rem; font-weight: 600; padding: 2px 7px; border-radius: 4px; }
        .paid-badge { background: rgba(74,222,128,0.15); color: #4ade80; }
        .pending-badge { background: rgba(251,191,36,0.15); color: #fbbf24; }
        .overdue-badge { background: rgba(248,113,113,0.15); color: #f87171; }

        /* ── ENGINES SECTION ── */
        .engines-section { padding: 80px 48px; }
        .engines-pill-wrap { text-align: center; margin-bottom: 16px; }
        .engines-title { text-align: center; font-size: clamp(1.6rem, 3.5vw, 2.3rem); font-weight: 800; color: #fff; letter-spacing: -1px; margin-bottom: 56px; }
        .engines-title .accent { color: var(--blue); }
        .engine-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1000px; margin: 0 auto 80px; }
        .engine-row.reverse { direction: rtl; }
        .engine-row.reverse > * { direction: ltr; }
        .engine-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--blue); margin-bottom: 10px; }
        .engine-h3 { font-size: 1.5rem; font-weight: 800; color: #fff; line-height: 1.2; letter-spacing: -0.5px; margin-bottom: 14px; }
        .engine-p { font-size: 0.85rem; color: var(--muted); line-height: 1.75; margin-bottom: 24px; }
        .engine-points { display: flex; flex-direction: column; gap: 14px; }
        .ep-item { display: flex; align-items: flex-start; gap: 12px; }
        .ep-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(79,142,247,0.12); border: 1px solid rgba(79,142,247,0.2); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }
        .ep-title { font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .ep-text { font-size: 0.75rem; color: var(--muted); line-height: 1.6; }
        .engine-ui { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
        .eu-title { font-size: 0.72rem; font-weight: 700; color: #fff; margin-bottom: 14px; }
        .eu-tabs { display: flex; gap: 6px; margin-bottom: 14px; }
        .eu-tab { font-size: 0.6rem; padding: 4px 10px; border-radius: 5px; border: 1px solid var(--border); color: var(--muted2); cursor: pointer; }
        .eu-tab.active { background: rgba(79,142,247,0.15); border-color: rgba(79,142,247,0.3); color: var(--blue); }
        .eu-row { display: flex; align-items: center; gap: 8px; padding: 9px 10px; background: var(--bg3); border-radius: 8px; margin-bottom: 6px; border: 1px solid var(--border); }
        .eu-row:last-child { margin-bottom: 0; }
        .eu-num { width: 20px; height: 20px; border-radius: 5px; background: rgba(79,142,247,0.15); color: var(--blue); font-size: 0.6rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .eu-name { font-size: 0.68rem; color: var(--muted); flex: 1; }
        .eu-action { font-size: 0.6rem; font-weight: 600; padding: 3px 9px; border-radius: 5px; border: none; cursor: pointer; }
        .eu-action.primary { background: var(--blue); color: #fff; }
        .eu-action.ghost { background: rgba(255,255,255,0.06); color: var(--muted); }

        /* notify panel */
        .notify-panel { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 18px; }
        .np-title { font-size: 0.72rem; font-weight: 700; color: #fff; margin-bottom: 14px; }
        .np-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px; background: var(--bg3); border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--border); }
        .np-item:last-child { margin-bottom: 0; }
        .np-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 2px; flex-shrink: 0; }
        .np-text { font-size: 0.65rem; color: var(--muted); line-height: 1.5; }
        .np-time { font-size: 0.58rem; color: var(--muted2); margin-top: 3px; }
        .np-add { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; margin-top: 10px; padding: 9px; border: 1px dashed rgba(79,142,247,0.3); border-radius: 8px; background: rgba(79,142,247,0.05); color: var(--blue); font-size: 0.68rem; font-weight: 600; cursor: pointer; }

        /* ── FAQ ── */
        .faq-section { padding: 80px 48px; }
        .faq-pill-wrap { text-align: center; margin-bottom: 12px; }
        .faq-title { text-align: center; font-size: clamp(1.6rem, 3.5vw, 2.3rem); font-weight: 800; color: #fff; letter-spacing: -1px; margin-bottom: 56px; }
        .faq-title .accent { color: var(--blue); }
        .faq-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; max-width: 960px; margin: 0 auto; align-items: start; }
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 18px; cursor: pointer; gap: 12px;
          font-size: 0.82rem; font-weight: 600; color: #fff;
          transition: background 0.15s;
        }
        .faq-q:hover { background: rgba(255,255,255,0.02); }
        .faq-q.open { color: var(--blue); }
        .faq-chevron { font-size: 0.7rem; color: var(--muted2); flex-shrink: 0; transition: transform 0.2s; }
        .faq-chevron.open { transform: rotate(180deg); color: var(--blue); }
        .faq-a { font-size: 0.78rem; color: var(--muted); line-height: 1.72; padding: 0 18px 16px; }
        .faq-ui { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
        .fu-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .fu-title { font-size: 0.75rem; font-weight: 700; color: #fff; }
        .fu-live { display: flex; align-items: center; gap: 5px; font-size: 0.6rem; color: #4ade80; }
        .fu-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: blink 2s infinite; }
        .fu-row { display: flex; align-items: center; gap: 10px; padding: 10px; background: var(--bg3); border-radius: 8px; margin-bottom: 7px; border: 1px solid var(--border); }
        .fu-row:last-of-type { margin-bottom: 10px; }
        .fu-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; }
        .fu-text { font-size: 0.65rem; color: var(--muted); flex: 1; line-height: 1.4; }
        .fu-status { font-size: 0.58rem; font-weight: 700; }
        .fu-add { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 9px; border: 1px dashed rgba(79,142,247,0.3); border-radius: 8px; background: rgba(79,142,247,0.05); color: var(--blue); font-size: 0.68rem; font-weight: 600; cursor: pointer; }

        /* ── CTA BANNER ── */
        .cta-section { padding: 80px 48px; }
        .cta-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .cta-text h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -1px; margin-bottom: 18px; }
        .cta-text h2 span { color: var(--blue); }
        .cta-text p { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 28px; }
        .cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-btn-primary { background: var(--blue); color: #fff; padding: 11px 22px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 6px 20px var(--blue-glow); transition: transform 0.15s; }
        .cta-btn-primary:hover { transform: translateY(-1px); }
        .cta-btn-ghost { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: rgba(255,255,255,0.7); padding: 11px 22px; border-radius: 8px; font-size: 0.85rem; font-weight: 500; text-decoration: none; cursor: pointer; transition: background 0.2s; }
        .cta-btn-ghost:hover { background: rgba(255,255,255,0.08); }
        .cta-dash { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; }

        /* ── FOOTER ── */
        .footer { border-top: 1px solid var(--border); padding: 48px 48px 32px; }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
        .ft-brand p { font-size: 0.78rem; color: var(--muted); line-height: 1.7; margin-top: 12px; max-width: 240px; }
        .ft-col h4 { font-size: 0.78rem; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px; }
        .ft-col a { display: block; font-size: 0.78rem; color: var(--muted); text-decoration: none; margin-bottom: 9px; transition: color 0.2s; }
        .ft-col a:hover { color: #fff; }
        .footer-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 24px; border-top: 1px solid var(--border); }
        .fb-copy { font-size: 0.72rem; color: var(--muted2); }
        .footer-brand-big { text-align: center; padding: 40px 48px 48px; border-top: 1px solid var(--border); }
        .fbb-text { font-size: clamp(3rem, 9vw, 7rem); font-weight: 900; color: rgba(255,255,255,0.04); letter-spacing: -4px; line-height: 1; text-transform: uppercase; user-select: none; }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .hero { padding: 60px 20px 40px; }
          .float-left, .float-right { display: none; }
          .dash-section { padding: 20px 20px 60px; }
          .dash-grid { grid-template-columns: 1fr; }
          .logo-strip { padding: 36px 20px; }
          .ls-logos { gap: 20px; }
          .why-section, .engines-section, .faq-section, .cta-section { padding: 56px 20px; }
          .why-grid { grid-template-columns: 1fr; }
          .engine-row, .engine-row.reverse { grid-template-columns: 1fr; direction: ltr; gap: 32px; }
          .faq-layout { grid-template-columns: 1fr; }
          .cta-inner { grid-template-columns: 1fr; }
          .footer { padding: 40px 20px 24px; }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .footer-brand-big { padding: 20px; }
        }
      `}</style>

      {/* ════════════ NAV ════════════ */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">S</div>
          <span className="nav-logo-name">School<span>Hive</span></span>
        </a>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#why" className="nav-link">Why Us</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="/school-admin/login" className="nav-btn">School Login →</a>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section className="hero">
        {/* Floating side panels */}
        <div className="hero-floats">
          {/* Left panel – collection ring */}
          <div className="float-panel float-left">
            <div className="fp-label">Fee Collection</div>
            <div className="fp-ring">
              <svg viewBox="0 0 70 70" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle cx="35" cy="35" r="28" fill="none" stroke="#4f8ef7" strokeWidth="6" strokeDasharray="175.93" strokeDashoffset="47.5" strokeLinecap="round" transform="rotate(-90 35 35)" />
              </svg>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div className="fp-pct">82%</div>
                <div className="fp-sub">Collected</div>
              </div>
            </div>
            <div className="bar-group">
              {[["Tuition", "78%"], ["Hostel", "91%"], ["Transport", "65%"]].map(([l, w], i) => (
                <div key={i}>
                  <div className="bar-label">{l}</div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: w }} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel – recent activity */}
          <div className="float-panel float-right">
            <div className="fp-label">Recent Payments</div>
            {[
              { name: "Aryan S.", color: "#4ade80", val: "₹12.5K" },
              { name: "Priya V.", color: "#fbbf24", val: "₹9.8K" },
              { name: "Dev G.", color: "#f87171", val: "Overdue" },
              { name: "Meera P.", color: "#4ade80", val: "₹8.2K" },
            ].map((r, i) => (
              <div key={i} className="fp-row">
                <div className="fp-dot" style={{ background: r.color }} />
                <span className="fp-name">{r.name}</span>
                <span className="fp-val" style={{ color: r.color }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Smart School Management Platform
          </div>
          <h1>
            Simplify Fees. <br />
            <span className="line2">Strengthen School Finances.</span>
          </h1>
          <p className="hero-sub">
            Transform how your school collects fees, tracks students, and communicates with parents — through intelligent automation, real-time dashboards, and zero paperwork.
          </p>
          <a href="#contact" className="hero-cta">
            Get Started Free →
          </a>
        </div>
      </section>

      {/* ════════════ DASHBOARD CARDS ════════════ */}
      <section className="dash-section">
        <div className="dash-grid">
          {/* Card 1 – collection trend */}
          <div className="dash-card">
            <div className="dc-header">
              <span className="dc-title">📊 Dashboard</span>
              <span className="dc-tag">June 2026</span>
            </div>
            <div className="dc-nav">
              {["Overview", "Students", "Reports"].map((t, i) => (
                <div key={i} className={`dc-nav-item ${i === 0 ? "active" : ""}`}>{t}</div>
              ))}
            </div>
            <div className="mini-chart">
              {[30, 50, 40, 70, 55, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
                <div key={i} className={`mini-bar ${h > 75 ? "hi" : ""}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mini-summary">
              <div className="ms-box"><div className="ms-label">Collected</div><div className="ms-val blue">₹8.4L</div></div>
              <div className="ms-box"><div className="ms-label">Total Students</div><div className="ms-val">1,248</div></div>
              <div className="ms-box"><div className="ms-label">Pending</div><div className="ms-val" style={{ color: "#fbbf24" }}>₹1.9L</div></div>
              <div className="ms-box"><div className="ms-label">Paid Today</div><div className="ms-val green">43</div></div>
            </div>
          </div>

          {/* Card 2 – ring + distribution */}
          <div className="dash-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="ring-card">
              <div className="dc-title" style={{ fontSize: "0.72rem" }}>Collection Rate</div>
              <div className="big-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#4f8ef7" strokeWidth="9" strokeDasharray="238.76" strokeDashoffset="64.5" strokeLinecap="round" />
                </svg>
                <div className="big-ring-center">
                  <div className="big-ring-pct">73%</div>
                  <div className="big-ring-label">this month</div>
                </div>
              </div>
              <div className="ring-legend">
                {[
                  { c: "#4f8ef7", l: "Tuition", v: "₹5.2L" },
                  { c: "#6c63ff", l: "Hostel", v: "₹1.8L" },
                  { c: "#4ade80", l: "Transport", v: "₹1.4L" },
                ].map((r, i) => (
                  <div key={i} className="rl-item">
                    <div className="rl-dot" style={{ background: r.c }} />
                    <span className="rl-name">{r.l}</span>
                    <span className="rl-val">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="dc-title" style={{ fontSize: "0.72rem", marginBottom: 12 }}>Today's Summary</div>
              {[
                { l: "Fees Collected", v: "₹68,400" },
                { l: "Transactions", v: "43" },
                { l: "New Admissions", v: "6" },
                { l: "Reminders Sent", v: "112" },
              ].map((r, i) => (
                <div key={i} className="dc-summary-row">
                  <span className="dcr-label">{r.l}</span>
                  <span className="dcr-val">{r.v}</span>
                </div>
              ))}
              <div className="dist-bars" style={{ marginTop: 14 }}>
                <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.8px" }}>Class Distribution</div>
                {[
                  { name: "Class X", pct: 85, color: "#4f8ef7" },
                  { name: "Class IX", pct: 70, color: "#6c63ff" },
                  { name: "Class VIII", pct: 60, color: "#4ade80" },
                  { name: "Class VII", pct: 45, color: "#fbbf24" },
                ].map((b, i) => (
                  <div key={i} className="db-row">
                    <span className="db-name">{b.name}</span>
                    <div className="db-track"><div className="db-fill" style={{ width: `${b.pct}%`, background: b.color }} /></div>
                    <span className="db-num">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ LOGO STRIP ════════════ */}
      <div className="logo-strip">
        <div className="ls-label">Our Previous Clients</div>
        <div className="ls-logos">
          {["Delhi Public", "St. Mary's", "Kendriya", "Navodaya", "Ryan Intl.", "DPS Group"].map((l, i) => (
            <div key={i} className="ls-logo">{l}</div>
          ))}
        </div>
      </div>

      {/* ════════════ WHY SCHOOLHIVE ════════════ */}
      <section className="why-section" id="why">
        <div className="section-pill">Why Choose Us</div>
        <h2 className="section-h2">
          Why use <span className="accent">SchoolHive</span> For<br />Fee & School Management
        </h2>
        <div className="why-grid">
          {/* Card 1 – Fee Management */}
          <div className="why-card">
            <div className="why-card-img">
              <div className="mini-ui">
                {[
                  { name: "Arjun Mehta — Tuition", badge: "paid-badge", label: "Paid ✓" },
                  { name: "Kavya Nair — Hostel", badge: "pending-badge", label: "Pending" },
                  { name: "Dev Sharma — Transport", badge: "paid-badge", label: "Paid ✓" },
                  { name: "Ishaan Bose — Tuition", badge: "overdue-badge", label: "Overdue !" },
                ].map((r, i) => (
                  <div key={i} className="mui-row">
                    <div className="mui-icon" style={{ background: "rgba(79,142,247,0.1)" }}>🧾</div>
                    <span className="mui-text">{r.name}</span>
                    <span className={`mui-badge ${r.badge}`}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-card-body">
              <div className="why-card-title">Fee Collection Automation</div>
              <p className="why-card-text">With real-time tracking, multi-head fee management, and smart collection, SchoolHive helps you record every payment and reduce defaulters by up to 40%.</p>
            </div>
          </div>

          {/* Card 2 – Parent & Staff Portal */}
          <div className="why-card">
            <div className="why-card-img">
              <div className="mini-ui">
                {[
                  { name: "WhatsApp reminder sent — 248 parents", color: "rgba(74,222,128,0.1)", icon: "📱" },
                  { name: "Receipt generated — Aryan Sharma", color: "rgba(79,142,247,0.1)", icon: "📄" },
                  { name: "Late fine applied — 12 students", color: "rgba(251,191,36,0.1)", icon: "⚡" },
                  { name: "Monthly report ready — Jun 2026", color: "rgba(108,99,255,0.1)", icon: "📊" },
                ].map((r, i) => (
                  <div key={i} className="mui-row">
                    <div className="mui-icon" style={{ background: r.color }}>{r.icon}</div>
                    <span className="mui-text">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-card-body">
              <div className="why-card-title">Parent & Staff Automation</div>
              <p className="why-card-text">From automated WhatsApp reminders and digital receipts to staff role-based access and detailed financial reports — SchoolHive keeps everyone informed and aligned.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TWO ENGINES ════════════ */}
      <section className="engines-section" id="features">
        <div className="engines-pill-wrap"><div className="section-pill">Core Features</div></div>
        <h2 className="engines-title">One Platform with Two <span className="accent">Powerful Engines</span></h2>

        {/* Engine 1 – Fee Engine */}
        <div className="engine-row">
          <div>
            <div className="engine-label">Fee Management Engine</div>
            <h3 className="engine-h3">Collect Fees. Track Every Rupee.</h3>
            <p className="engine-p">SchoolHive's Fee Engine streamlines your entire collection cycle — from issuing demand notices to reconciling bank deposits — with zero manual effort.</p>
            <div className="engine-points">
              <div className="ep-item">
                <div className="ep-icon">💳</div>
                <div><div className="ep-title">Online & Counter Payments</div><div className="ep-text">Accept UPI, cards, and net banking online while also recording cash and cheque payments at the front desk.</div></div>
              </div>
              <div className="ep-item">
                <div className="ep-icon">🧾</div>
                <div><div className="ep-title">Instant Digital Receipts</div><div className="ep-text">Auto-generate GST-compliant receipts and deliver them to parents via WhatsApp and email the moment a payment is made.</div></div>
              </div>
            </div>
          </div>
          <div className="engine-ui">
            <div className="eu-title">Fee Collection — Class X-A</div>
            <div className="eu-tabs">
              {["All Students", "Pending", "Paid"].map((t, i) => (
                <div key={i} className={`eu-tab ${i === 0 ? "active" : ""}`}>{t}</div>
              ))}
            </div>
            {[
              { name: "Aryan Sharma", status: "Collect", type: "primary" },
              { name: "Priya Verma", status: "Pending", type: "ghost" },
              { name: "Rohan Gupta", status: "Paid ✓", type: "ghost" },
              { name: "Sneha Patel", status: "Overdue!", type: "primary" },
            ].map((r, i) => (
              <div key={i} className="eu-row">
                <div className="eu-num">{i + 1}</div>
                <span className="eu-name">{r.name}</span>
                <button className={`eu-action ${r.type}`}>{r.status}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Engine 2 – Notification Engine */}
        <div className="engine-row reverse">
          <div>
            <div className="engine-label">Smart Notification Engine</div>
            <h3 className="engine-h3">Turn Reminders into Results.</h3>
            <p className="engine-p">SchoolHive's notification engine is designed to build strong parent relationships and drive timely payments through personalised, automated outreach.</p>
            <div className="engine-points">
              <div className="ep-item">
                <div className="ep-icon">📲</div>
                <div><div className="ep-title">Personalised WhatsApp & SMS Alerts</div><div className="ep-text">Send due-date reminders, receipt confirmations, and overdue notices automatically — in the parent's preferred language.</div></div>
              </div>
              <div className="ep-item">
                <div className="ep-icon">🔁</div>
                <div><div className="ep-title">Seamless Escalation Rules</div><div className="ep-text">Define escalation chains — first WhatsApp, then SMS, then call list — to ensure no outstanding fee goes unnoticed.</div></div>
              </div>
            </div>
          </div>
          <div className="notify-panel">
            <div className="np-title">Automated Notifications</div>
            {[
              { dot: "#4ade80", text: "Fee receipt sent to Aryan Sharma's parent via WhatsApp", time: "Just now", bg: "rgba(74,222,128,0.08)" },
              { dot: "#fbbf24", text: "Reminder: ₹9,800 due for Kavya Nair — Class VIII", time: "2 min ago", bg: "rgba(251,191,36,0.08)" },
              { dot: "#4f8ef7", text: "Monthly statement dispatched to 248 parents", time: "1 hr ago", bg: "rgba(79,142,247,0.08)" },
              { dot: "#f87171", text: "Overdue alert: Ishaan Bose has not paid for 15 days", time: "3 hr ago", bg: "rgba(248,113,113,0.08)" },
            ].map((n, i) => (
              <div key={i} className="np-item" style={{ background: n.bg }}>
                <div className="np-dot" style={{ background: n.dot }} />
                <div>
                  <div className="np-text">{n.text}</div>
                  <div className="np-time">{n.time}</div>
                </div>
              </div>
            ))}
            <div className="np-add">+ Add Notification Rule</div>
          </div>
        </div>

        {/* Engine 3 – Analytics */}
        <div className="engine-row">
          <div>
            <div className="engine-label">Intelligent Analytics Engine</div>
            <h3 className="engine-h3">Smarter Decisions. Every Day.</h3>
            <p className="engine-p">Get a 360° view of your school's financial health with live dashboards, class-wise collection reports, and predictive defaulter alerts — all from one screen.</p>
            <div className="engine-points">
              <div className="ep-item">
                <div className="ep-icon">📊</div>
                <div><div className="ep-title">Integrated Financial Dashboards</div><div className="ep-text">Monitor fee collection, pending amounts, and daily cash flow at a glance — across all classes, sections, and branches in a single view.</div></div>
              </div>
              <div className="ep-item">
                <div className="ep-icon">🔔</div>
                <div><div className="ep-title">Real-Time Alerts for Admins</div><div className="ep-text">Get instant notifications when collection targets are hit, when a large payment is received, or when overdue cases need escalation.</div></div>
              </div>
            </div>
          </div>
          <div className="engine-ui">
            <div className="eu-title">📈 Analytics Overview — Jun 2026</div>
            <div className="mini-chart" style={{ height: 80 }}>
              {[40, 60, 45, 80, 55, 90, 70, 100, 80, 95, 75, 88].map((h, i) => (
                <div key={i} className={`mini-bar ${h > 70 ? "hi" : ""}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mini-summary" style={{ marginTop: 12 }}>
              {[
                { l: "Monthly Target", v: "₹12L" },
                { l: "Achieved", v: "₹8.4L", c: "#4ade80" },
                { l: "Defaulters", v: "38", c: "#f87171" },
                { l: "Waivers Given", v: "12", c: "#fbbf24" },
              ].map((s, i) => (
                <div key={i} className="ms-box">
                  <div className="ms-label">{s.l}</div>
                  <div className="ms-val" style={{ color: s.c || "#fff" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="faq-section" id="faq">
        <div className="faq-pill-wrap"><div className="section-pill">Powered by Smart Questions</div></div>
        <h2 className="faq-title">Common <span className="accent">Queries & Answers</span><br />About SchoolHive</h2>
        <div className="faq-layout">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <div className={`faq-q ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{i + 1}. {f.q}</span>
                  <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>▼</span>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
          <div className="faq-ui">
            <div className="fu-header">
              <span className="fu-title">📋 Live Student Feed</span>
              <span className="fu-live"><span className="fu-live-dot" />Live</span>
            </div>
            {[
              { icon: "✅", bg: "rgba(74,222,128,0.1)", text: "Generating receipt for Aryan Sharma", status: "Done", sc: "#4ade80" },
              { icon: "⏳", bg: "rgba(79,142,247,0.1)", text: "Loyalty: Sending reminder to Kavya Nair", status: "In Progress", sc: "#4f8ef7" },
              { icon: "⚡", bg: "rgba(251,191,36,0.1)", text: "Late fine applied to Ishaan Bose (15 days)", status: "Applied", sc: "#fbbf24" },
              { icon: "📨", bg: "rgba(108,99,255,0.1)", text: "WhatsApp receipt dispatched to 43 parents", status: "Sent", sc: "#6c63ff" },
            ].map((r, i) => (
              <div key={i} className="fu-row">
                <div className="fu-icon" style={{ background: r.bg }}>{r.icon}</div>
                <div className="fu-text">{r.text}</div>
                <span className="fu-status" style={{ color: r.sc }}>{r.status}</span>
              </div>
            ))}
            <div style={{ height: 10 }} />
            <div className="fu-add">+ Add Student</div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section className="cta-section" id="contact">
        <div className="cta-inner">
          <div className="cta-text">
            <h2>Power Up Your<br />School <span>Finances</span> Today</h2>
            <p>Let SchoolHive be your digital management partner — whether you're looking to improve fee collection, eliminate paperwork, or build a complete financial ecosystem. We help institutions deliver more impact at scale.</p>
            <div className="cta-btns">
              <a href="#" className="cta-btn-primary">Get Started</a>
              <a href="#" className="cta-btn-ghost">Book a Demo</a>
            </div>
          </div>
          <div className="cta-dash">
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", marginBottom: 14 }}>📊 Dashboard</div>
            <div className="mini-chart" style={{ height: 70, marginBottom: 14 }}>
              {[30, 50, 40, 70, 55, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
                <div key={i} className={`mini-bar ${h > 75 ? "hi" : ""}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            {[
              { l: "Fee Collected", v: "₹8.4L" },
              { l: "Today's Payments", v: "43" },
              { l: "Pending Reminders", v: "112" },
              { l: "Active Students", v: "1,248" },
            ].map((r, i) => (
              <div key={i} className="dc-summary-row">
                <span className="dcr-label">{r.l}</span>
                <span className="dcr-val">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="footer">
        <div className="footer-top">
          <div className="ft-brand">
            <a href="#" className="nav-logo" style={{ textDecoration: "none" }}>
              <div className="nav-logo-mark">S</div>
              <span className="nav-logo-name">School<span>Hive</span></span>
            </a>
            <p>The smartest way to manage school fees, communicate with parents, and grow your institution — all from one powerful platform.</p>
          </div>
          <div className="ft-col">
            <h4>Info</h4>
            <a href="#">About SchoolHive</a>
            <a href="#">For Schools</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="ft-col">
            <h4>Features</h4>
            <a href="#">Loyalty Engine</a>
            <a href="#">Fee Manager</a>
            <a href="#">Analytics</a>
            <a href="#">Automations</a>
          </div>
          <div className="ft-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Security</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="fb-copy">© 2026 SchoolHive. All rights reserved. Made with ❤️ for Indian Schools.</span>
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>🔒 SSL Secured · 🇮🇳 Hosted in India</span>
        </div>
      </footer>

      {/* Big brand watermark */}
      <div className="footer-brand-big">
        <div className="fbb-text">SCHOOL HIVE</div>
      </div>
    </div>
  );
}