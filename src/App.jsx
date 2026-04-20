import React, { useState, useEffect, useRef } from "react";
import logoTomato from "./tomato-girl.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap');

  :root {
    --neon-red: #ff2020;
    --neon-red-dim: #cc1010;
    --neon-green: #39ff14;
    --neon-yellow: #ffe600;
    --bg-deep: #04040a;
    --bg-card: #0d0d1a;
    --bg-panel: #080814;
    --grid-color: rgba(255,32,32,0.07);
    --border-glow: rgba(255,32,32,0.4);
    --text-dim: #8888aa;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--bg-deep); color: #e0e0f0; font-family: 'Rajdhani', sans-serif; }

  /* ---- SCANLINES ---- */
  .scanlines::after {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.15) 2px,
      rgba(0,0,0,0.15) 4px
    );
  }

  /* ---- GRID BG ---- */
  .grid-bg {
    background-image:
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* ---- GLITCH ---- */
  @keyframes glitch-1 {
    0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-3px, 0); }
    20% { clip-path: inset(20% 0 60% 0); transform: translate(3px, 0); }
    40% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 0); }
    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 0); }
    80% { clip-path: inset(40% 0 40% 0); transform: translate(-3px, 0); }
  }
  @keyframes glitch-2 {
    0%,100% { clip-path: inset(80% 0 0 0); transform: translate(3px, 0); color: var(--neon-green); }
    30% { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 0); color: var(--neon-red); }
    60% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); color: var(--neon-yellow); }
  }
  .glitch-wrap { position: relative; display: inline-block; }
  .glitch-wrap::before, .glitch-wrap::after {
    content: attr(data-text);
    position: absolute; inset: 0;
    font: inherit; color: inherit;
    opacity: 0.85;
  }
  .glitch-wrap::before { animation: glitch-1 3.5s infinite; color: var(--neon-red); }
  .glitch-wrap::after  { animation: glitch-2 4.1s infinite; color: var(--neon-green); }

  /* ---- NEON PULSE ---- */
  @keyframes neon-pulse {
    0%,100% { text-shadow: 0 0 6px var(--neon-red), 0 0 18px var(--neon-red), 0 0 40px var(--neon-red-dim); }
    50% { text-shadow: 0 0 10px var(--neon-red), 0 0 30px var(--neon-red), 0 0 60px var(--neon-red-dim), 0 0 100px rgba(255,32,32,0.3); }
  }
  .neon-text { animation: neon-pulse 2.5s ease-in-out infinite; color: var(--neon-red); }

  @keyframes border-pulse {
    0%,100% { box-shadow: 0 0 6px var(--neon-red), inset 0 0 6px rgba(255,32,32,0.1); border-color: var(--neon-red); }
    50% { box-shadow: 0 0 18px var(--neon-red), 0 0 40px rgba(255,32,32,0.3), inset 0 0 12px rgba(255,32,32,0.15); border-color: #ff5555; }
  }
  .border-glow { animation: border-pulse 2.5s ease-in-out infinite; border: 1px solid var(--neon-red); }

  /* ---- TICKER ---- */
  @keyframes ticker-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-track { animation: ticker-scroll 22s linear infinite; white-space: nowrap; }
  .ticker-track:hover { animation-play-state: paused; }

  /* ---- FADE IN ---- */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fade-up 0.8s cubic-bezier(.16,1,.3,1) both; }
  .fade-up-d1 { animation-delay: 0.1s; }
  .fade-up-d2 { animation-delay: 0.25s; }
  .fade-up-d3 { animation-delay: 0.4s; }
  .fade-up-d4 { animation-delay: 0.55s; }

  /* ---- FLICKER ---- */
  @keyframes flicker {
    0%,95%,100% { opacity: 1; }
    96% { opacity: 0.6; }
    97% { opacity: 1; }
    98% { opacity: 0.4; }
    99% { opacity: 1; }
  }
  .flicker { animation: flicker 6s infinite; }

  /* ---- HOVER CARD ---- */
  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 28px rgba(255,32,32,0.35), 0 8px 32px rgba(0,0,0,0.7);
  }

  /* ---- CORNER CUTS ---- */
  .corner-cut {
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
  }
  .corner-cut-sm {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  /* ---- CTA BUTTON ---- */
  .cta-btn {
    position: relative; overflow: hidden;
    background: transparent;
    border: 2px solid var(--neon-red);
    color: #fff; font-family: 'Orbitron', monospace; font-weight: 700;
    letter-spacing: 0.1em; cursor: pointer;
    transition: color 0.2s;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    box-shadow: 0 0 12px rgba(255,32,32,0.4);
  }
  .cta-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--neon-red);
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: -1;
  }
  .cta-btn:hover::before { transform: translateX(0); }
  .cta-btn:hover { color: #000; box-shadow: 0 0 28px rgba(255,32,32,0.7); }

  .cta-btn-green {
    border-color: var(--neon-green);
    box-shadow: 0 0 12px rgba(57,255,20,0.3);
  }
  .cta-btn-green::before { background: var(--neon-green); }
  .cta-btn-green:hover { box-shadow: 0 0 28px rgba(57,255,20,0.6); }

  /* ---- NAV ---- */
  .nav-link {
    position: relative; font-family: 'Orbitron', monospace; font-size: 0.7rem;
    letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-dim);
    text-decoration: none; padding: 4px 0; transition: color 0.2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1px; background: var(--neon-red);
    transform: scaleX(0); transition: transform 0.2s; transform-origin: left;
  }
  .nav-link:hover { color: var(--neon-red); }
  .nav-link:hover::after { transform: scaleX(1); }

  /* ---- ROADMAP ---- */
  .rm-node::before {
    content: '';
    position: absolute; left: -1px; top: 36px; bottom: -20px; width: 1px;
    background: linear-gradient(to bottom, var(--neon-red), transparent);
  }

  /* ---- IMAGE NEON FRAME ---- */
  @keyframes image-glow {
    0%,100% { filter: drop-shadow(0 0 12px rgba(255,32,32,0.6)) drop-shadow(0 0 32px rgba(255,32,32,0.3)); }
    50% { filter: drop-shadow(0 0 22px rgba(255,32,32,0.9)) drop-shadow(0 0 50px rgba(255,32,32,0.4)) brightness(1.05); }
  }
  .img-glow { animation: image-glow 3s ease-in-out infinite; }

  /* ---- STAT ---- */
  .stat-value { font-family: 'Orbitron', monospace; }

  /* ---- SCROLL BAR ---- */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg-deep); }
  ::-webkit-scrollbar-thumb { background: var(--neon-red); }
`;

const TICKER_ITEMS = [
  "$TOMATO", "SOLANA", "LAUNCHED Jun 28 2025",
  "500M SUPPLY", "NO PRESALE", "NO VC",
  "1000 X FOLLOWERS", "JOIN THE SAUCE 🍅",
  "$TOMATO", "SOLANA", "LAUNCHED Jun 28 2025",
  "500M SUPPLY", "NO PRESALE", "NO VC",
  "1000 X FOLLOWERS", "JOIN THE SAUCE 🍅",
];

const ROADMAP = [
  { phase: "PHASE 01", title: "GENESIS LAUNCH", status: "DONE", items: ["Token launch on Pump.fun", "Community build on X & Telegram", "First 1000 holders", "Meme Gallery deployed"] },
  { phase: "PHASE 02", title: "CULTIVATION", status: "ACTIVE", items: ["CoinGecko & CMC listing", "Orca liquidity pool", "Influencer collabs", "10K X followers target"] },
  { phase: "PHASE 03", title: "DOMINATION", status: "SOON", items: ["CEX listing push", "Merch drop", "Cross-chain expansion", "DAO governance v1"] },
];

const NEWS = [
  { date: "JUL 21 2025", tag: "MILESTONE", title: "1000 followers on X", body: "The 🍅 army is growing. We hit our first major social milestone — the sauce is spreading." },
  { date: "JUN 28 2025", tag: "LAUNCH", title: "TOMATO goes live on Solana", body: "No VC kitchen. No presale. $TOMATO launched raw, organic, and unstoppable on Solana." },
];

export default function App() {
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().replace("T", " ").slice(0, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="scanlines" style={{ minHeight: "100vh", background: "var(--bg-deep)", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(4,4,10,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,32,32,0.2)",
          padding: "0 24px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            {/* Logo */}
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>🍅</span>
              <span className="flicker" style={{
                fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "1rem",
                letterSpacing: "0.12em", color: "var(--neon-red)",
                textShadow: "0 0 10px var(--neon-red), 0 0 24px rgba(255,32,32,0.4)"
              }}>TOMATO</span>
              <span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.08em", marginLeft: 2 }}>COIN</span>
            </a>

            {/* Desktop Links */}
            <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {[["Roadmap", "/roadmap"], ["Tokenomics", "/tokenomics"], ["Meme Gallery", "/memes"]].map(([label, href]) => (
                <a key={label} href={href} className="nav-link">{label}</a>
              ))}
              <a href="https://x.com/offtomatocoin" target="_blank" rel="noreferrer"
                className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.65rem" }}>
                BUY $TOMATO
              </a>
            </div>
          </div>
        </nav>

        {/* ── TICKER ── */}
        <div style={{
          marginTop: 64, background: "rgba(255,32,32,0.08)", borderBottom: "1px solid rgba(255,32,32,0.25)",
          padding: "8px 0", overflow: "hidden",
        }}>
          <div className="ticker-track" style={{ display: "inline-flex", gap: 0 }}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{
                fontFamily: "'Share Tech Mono'", fontSize: "0.7rem",
                color: i % 4 === 0 ? "var(--neon-red)" : i % 4 === 2 ? "var(--neon-green)" : "#aaa",
                padding: "0 24px", letterSpacing: "0.1em",
              }}>
                {i % 4 === 0 ? "◆" : "·"} {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="grid-bg" style={{
          minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden", padding: "80px 24px",
        }}>
          {/* Radial glow bg */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,32,32,0.07) 0%, transparent 70%)",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", position: "relative", zIndex: 1 }}>

            {/* Left: Text */}
            <div style={{ flex: "1 1 480px" }}>
              {/* Label */}
              <div className="fade-up" style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
                fontFamily: "'Share Tech Mono'", fontSize: "0.7rem", color: "var(--neon-green)",
                letterSpacing: "0.18em",
                padding: "6px 14px", border: "1px solid rgba(57,255,20,0.3)",
                background: "rgba(57,255,20,0.05)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--neon-green)", display: "inline-block", boxShadow: "0 0 8px var(--neon-green)" }} />
                LIVE ON SOLANA · $TOMATO
              </div>

              {/* Big glitch title */}
              <h1 className="fade-up fade-up-d1" style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>
                <div className="glitch-wrap neon-text" data-text="TOMATO" style={{ fontSize: "clamp(64px,10vw,120px)", display: "block" }}>
                  TOMATO
                </div>
                <div style={{ fontSize: "clamp(28px,4vw,52px)", color: "#fff", letterSpacing: "0.25em", marginTop: 4, fontWeight: 400 }}>
                  COIN
                </div>
              </h1>

              <p className="fade-up fade-up-d2" style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 300,
                color: "#bbbbd0", marginTop: 24, marginBottom: 36, lineHeight: 1.6, maxWidth: 500,
                letterSpacing: "0.04em",
              }}>
                The memecoin that <span style={{ color: "var(--neon-red)", fontWeight: 600 }}>refreshes your portfolio</span>.
                No VCs. No presale. Pure organic fire — grown on Solana, seasoned with chaos.
              </p>

              {/* Stats row */}
              <div className="fade-up fade-up-d3" style={{ display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
                {[["500M", "TOTAL SUPPLY"], ["0%", "TEAM ALLOCATION"], ["100%", "COMMUNITY OWNED"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="stat-value neon-text" style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.12em", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="fade-up fade-up-d4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="https://pump.fun" target="_blank" rel="noreferrer"
                  className="cta-btn" style={{ padding: "14px 32px", fontSize: "0.75rem" }}>
                  BUY $TOMATO
                </a>
                <a href="https://t.me/tomatocoinsolana" target="_blank" rel="noreferrer"
                  className="cta-btn cta-btn-green" style={{ padding: "14px 32px", fontSize: "0.75rem" }}>
                  JOIN TELEGRAM
                </a>
              </div>
            </div>

            {/* Right: Tomato Girl */}
            <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 320 }}>
                {/* Decorative ring */}
                <div className="border-glow" style={{
                  position: "absolute", inset: -20, borderRadius: "50%",
                  background: "radial-gradient(ellipse at center, rgba(255,32,32,0.08) 0%, transparent 70%)",
                }} />
               <img
  className="img-glow"
  src={logoTomato} // Remplace l'ancienne URL par {logoTomato}
  alt="Tomato Girl"
  style={{ width: "100%", objectFit: "contain", position: "relative", zIndex: 1 }}
/>
                {/* Corner decorators */}
                {[{ top: 0, left: 0, borderTop: "2px solid var(--neon-red)", borderLeft: "2px solid var(--neon-red)" },
                  { top: 0, right: 0, borderTop: "2px solid var(--neon-red)", borderRight: "2px solid var(--neon-red)" },
                  { bottom: 0, left: 0, borderBottom: "2px solid var(--neon-red)", borderLeft: "2px solid var(--neon-red)" },
                  { bottom: 0, right: 0, borderBottom: "2px solid var(--neon-red)", borderRight: "2px solid var(--neon-red)" }].map((s, i) => (
                  <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s, zIndex: 2 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.2em" }}>SCROLL</span>
            <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--neon-red), transparent)" }} />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={{ padding: "100px 24px", background: "var(--bg-panel)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

            {/* Terminal block */}
            <div className="border-glow corner-cut" style={{
              background: "var(--bg-card)", padding: "32px",
            }}>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.7rem", color: "var(--neon-green)", marginBottom: 16, letterSpacing: "0.1em" }}>
                $ cat about.txt
              </div>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.78rem", color: "#c8c8e0", lineHeight: 1.9, letterSpacing: "0.03em" }}>
                <span style={{ color: "var(--neon-red)" }}>{">"}</span> Tomatocoin is done watching tasteless<br />
                &nbsp;&nbsp;copy-paste tokens flood the Solana garden.<br />
                <br />
                <span style={{ color: "var(--neon-red)" }}>{">"}</span> Launched <span style={{ color: "var(--neon-yellow)" }}>June 28, 2025</span>. No VC kitchen.<br />
                &nbsp;&nbsp;No gimmicks. No presale.<br />
                <br />
                <span style={{ color: "var(--neon-red)" }}>{">"}</span> Pure memetic flavor — grown organically<br />
                &nbsp;&nbsp;by Web3 farmers who know their way<br />
                &nbsp;&nbsp;around a blockchain and a punchline.<br />
                <br />
                <span style={{ color: "var(--neon-green)" }}>{">"}</span> <span style={{ color: "#fff" }}>Join the sauce. Taste the meme.</span><br />
                &nbsp;&nbsp;Become the <span style={{ fontSize: "1rem" }}>🍅</span><span style={{ color: "var(--neon-red)" }}>_</span>
              </div>
            </div>

            {/* Features grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🚀", title: "FAIR LAUNCH", desc: "No presale, no VC allocation. 100% community driven." },
                { icon: "🔒", title: "LOCKED LP", desc: "Liquidity locked. Rugs are for carpets, not $TOMATO." },
                { icon: "🍅", title: "PURE MEME", desc: "Grown organically by degens, for degens." },
                { icon: "⚡", title: "SOLANA SPEED", desc: "Built on the fastest chain in crypto. Sub-second txs." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card-hover corner-cut-sm" style={{
                  background: "rgba(255,32,32,0.04)", border: "1px solid rgba(255,32,32,0.2)",
                  padding: "20px 18px",
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", color: "var(--neon-red)", letterSpacing: "0.15em", marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWS ── */}
        <section className="grid-bg" style={{ padding: "100px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Section header */}
            <div style={{ marginBottom: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "var(--neon-red)", letterSpacing: "0.2em", marginBottom: 10 }}>
                  ◆ LATEST_TRANSMISSIONS
                </div>
                <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}>
                  NEWS<span className="neon-text">_</span>
                </h2>
              </div>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "var(--text-dim)" }}>
                {time}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
              {NEWS.map(({ date, tag, title, body }) => (
                <div key={title} className="card-hover border-glow corner-cut" style={{
                  background: "var(--bg-card)", padding: "28px 28px 24px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--text-dim)" }}>{date}</span>
                    <span style={{
                      fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
                      color: tag === "LAUNCH" ? "#000" : "var(--neon-red)",
                      background: tag === "LAUNCH" ? "var(--neon-red)" : "rgba(255,32,32,0.1)",
                      padding: "3px 10px", letterSpacing: "0.1em",
                    }}>{tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#fff", marginBottom: 12, letterSpacing: "0.04em" }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", lineHeight: 1.6 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section style={{ padding: "100px 24px", background: "var(--bg-panel)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "var(--neon-red)", letterSpacing: "0.2em", marginBottom: 10 }}>◆ MISSION_TIMELINE</div>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}>
                ROADMAP<span className="neon-text">_</span>
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ROADMAP.map(({ phase, title, status, items }, idx) => (
                <div key={phase} className="rm-node" style={{ position: "relative", paddingLeft: 40, paddingBottom: 48 }}>
                  {/* Node dot */}
                  <div style={{
                    position: "absolute", left: -8, top: 8, width: 16, height: 16, borderRadius: "50%",
                    background: status === "DONE" ? "var(--neon-green)" : status === "ACTIVE" ? "var(--neon-red)" : "rgba(255,32,32,0.3)",
                    border: `2px solid ${status === "DONE" ? "var(--neon-green)" : "var(--neon-red)"}`,
                    boxShadow: status !== "SOON" ? `0 0 12px ${status === "DONE" ? "var(--neon-green)" : "var(--neon-red)"}` : "none",
                    zIndex: 1,
                  }} />
                  {/* Line */}
                  {idx < ROADMAP.length - 1 && (
                    <div style={{ position: "absolute", left: -1, top: 24, bottom: -8, width: 1, background: "linear-gradient(to bottom, rgba(255,32,32,0.4), rgba(255,32,32,0.1))" }} />
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--neon-red)", letterSpacing: "0.12em" }}>{phase}</span>
                    <span style={{
                      fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
                      color: status === "DONE" ? "#000" : status === "ACTIVE" ? "var(--neon-red)" : "var(--text-dim)",
                      background: status === "DONE" ? "var(--neon-green)" : status === "ACTIVE" ? "rgba(255,32,32,0.12)" : "transparent",
                      border: `1px solid ${status === "ACTIVE" ? "var(--neon-red)" : "transparent"}`,
                      padding: "2px 8px", letterSpacing: "0.1em",
                    }}>{status}</span>
                  </div>

                  <h3 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 16, letterSpacing: "0.06em" }}>
                    {title}
                  </h3>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {items.map(item => (
                      <div key={item} style={{
                        fontFamily: "'Share Tech Mono'", fontSize: "0.7rem",
                        color: status === "DONE" ? "var(--neon-green)" : "var(--text-dim)",
                        background: "rgba(255,32,32,0.04)", border: "1px solid rgba(255,32,32,0.15)",
                        padding: "5px 12px", letterSpacing: "0.05em",
                      }}>
                        {status === "DONE" ? "✓" : "○"} {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMUNITY / CTA ── */}
        <section style={{
          padding: "100px 24px", position: "relative", overflow: "hidden",
          background: "linear-gradient(180deg, var(--bg-deep) 0%, rgba(255,32,32,0.04) 50%, var(--bg-deep) 100%)",
        }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "clamp(3rem, 8vw, 6rem)", marginBottom: 20 }}>🍅</div>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
              JOIN THE<br /><span className="neon-text glitch-wrap" data-text="REVOLUTION">REVOLUTION</span>
            </h2>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem", color: "var(--text-dim)", marginBottom: 48, lineHeight: 1.6, letterSpacing: "0.04em" }}>
              Tomatocoin isn't just a token. It's a rebellion. A fresh movement.<br />
              A tomato-fueled uprising to bring joy and chaos back to crypto.
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://x.com/offtomatocoin" target="_blank" rel="noreferrer"
                className="cta-btn" style={{ padding: "16px 40px", fontSize: "0.75rem" }}>
                🐦 FOLLOW ON X
              </a>
              <a href="https://t.me/tomatocoinsolana" target="_blank" rel="noreferrer"
                className="cta-btn cta-btn-green" style={{ padding: "16px 40px", fontSize: "0.75rem" }}>
                💬 JOIN TELEGRAM
              </a>
            </div>
          </div>

          {/* Decorative glowing circle */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 500, height: 500, borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(ellipse at center, rgba(255,32,32,0.05) 0%, transparent 70%)",
            border: "1px solid rgba(255,32,32,0.08)",
          }} />
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1px solid rgba(255,32,32,0.2)",
          background: "var(--bg-panel)", padding: "40px 24px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🍅</span>
              <span className="flicker" style={{
                fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "0.8rem",
                color: "var(--neon-red)", letterSpacing: "0.12em",
              }}>TOMATOCOIN</span>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--text-dim)", textAlign: "center" }}>
              NOT FINANCIAL ADVICE · DYOR · 🍅 PURE MEME ENERGY
            </div>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--text-dim)" }}>
              © 2025 TOMATOCOIN
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
