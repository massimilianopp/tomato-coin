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
  html { scroll-behavior: smooth; }

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
];

const ROADMAP = [
  { phase: "PHASE 01", title: "GENESIS LAUNCH", status: "DONE", items: ["Token launch on Pump.fun", "Community build on X & Telegram", "First 1000 holders", "Website deployed"] },
  { phase: "PHASE 02", title: "CULTIVATION", status: "ACTIVE", items: ["CoinGecko & CMC listing", "Orca liquidity pool", "Influencer collabs", "10K X followers target"] },
  { phase: "PHASE 03", title: "DOMINATION", status: "SOON", items: ["CEX listing push", "Merch drop", "Cross-chain expansion", "DAO governance v1"] },
];

const TOKENOMICS = [
  { label: "Liquidity Pool", value: "90%", desc: "Burned at launch for maximum security." },
  { label: "Marketing", value: "5%", desc: "For spicy collabs and community growth." },
  { label: "Development", value: "5%", desc: "Ensuring the kitchen keeps cooking." },
  { label: "Tax", value: "0/0", desc: "Buy and sell tax is zero. Forever." },
];

export default function App() {
  const [time, setTime] = useState("");

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
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>🍅</span>
              <span className="flicker" style={{
                fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "1rem",
                letterSpacing: "0.12em", color: "var(--neon-red)",
                textShadow: "0 0 10px var(--neon-red), 0 0 24px rgba(255,32,32,0.4)"
              }}>TOMATO</span>
            </a>

            <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
              <a href="#roadmap" className="nav-link">Roadmap</a>
              <a href="#tokenomics" className="nav-link">Tokenomics</a>
              <a href="https://x.com/offtomatocoin" target="_blank" rel="noreferrer"
                className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.65rem" }}>
                BUY $TOMATO
              </a>
            </div>
          </div>
        </nav>

        {/* ── TICKER ── */}
        <div style={{ marginTop: 64, background: "rgba(255,32,32,0.08)", borderBottom: "1px solid rgba(255,32,32,0.25)", padding: "8px 0", overflow: "hidden" }}>
          <div className="ticker-track" style={{ display: "inline-flex" }}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.7rem", color: i % 4 === 0 ? "var(--neon-red)" : "#aaa", padding: "0 24px" }}>
                ◆ {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="grid-bg" style={{ minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", zIndex: 1 }}>
            <div style={{ flex: "1 1 480px" }}>
              <h1 className="fade-up fade-up-d1" style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, lineHeight: 1 }}>
                <div className="glitch-wrap neon-text" data-text="TOMATO" style={{ fontSize: "clamp(64px,10vw,120px)" }}>TOMATO</div>
                <div style={{ fontSize: "clamp(28px,4vw,52px)", color: "#fff", letterSpacing: "0.25em" }}>COIN</div>
              </h1>
              <p className="fade-up fade-up-d2" style={{ fontSize: "1.2rem", color: "#bbbbd0", marginTop: 24, marginBottom: 36, maxWidth: 500 }}>
                The memecoin that <span style={{ color: "var(--neon-red)" }}>refreshes your portfolio</span>. No VCs. No presale. Pure organic fire.
              </p>
              <div className="fade-up fade-up-d3" style={{ display: "flex", gap: 16 }}>
                <a href="https://pump.fun" className="cta-btn" style={{ padding: "14px 32px" }}>BUY NOW</a>
                <a href="#tokenomics" className="cta-btn cta-btn-green" style={{ padding: "14px 32px" }}>TOKENOMICS</a>
              </div>
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <img className="img-glow" src={logoTomato} alt="Tomato Girl" style={{ width: 320, position: "relative" }} />
            </div>
          </div>
        </section>

        {/* ── TOKENOMICS SECTION ── */}
        <section id="tokenomics" style={{ padding: "100px 24px", background: "var(--bg-panel)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "var(--neon-green)", letterSpacing: "0.2em" }}>◆ DATA_STRUCTURE</div>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "2.5rem", color: "#fff" }}>TOKENOMICS<span className="neon-text">_</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              {TOKENOMICS.map((t, i) => (
                <div key={i} className="card-hover border-glow corner-cut" style={{ background: "var(--bg-card)", padding: "30px" }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "2rem", fontWeight: 900, color: "var(--neon-red)", marginBottom: 10 }}>{t.value}</div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.8rem", color: "var(--neon-green)", marginBottom: 15, textTransform: "uppercase" }}>{t.label}</div>
                  <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROADMAP SECTION ── */}
        <section id="roadmap" style={{ padding: "100px 24px", background: "var(--bg-deep)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "var(--neon-red)", letterSpacing: "0.2em" }}>◆ MISSION_TIMELINE</div>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "2.5rem", color: "#fff" }}>ROADMAP<span className="neon-text">_</span></h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {ROADMAP.map((phase, idx) => (
                <div key={idx} style={{ position: "relative", paddingLeft: 40, paddingBottom: 48, borderLeft: "1px solid rgba(255,32,32,0.2)" }}>
                  <div style={{
                    position: "absolute", left: -8, top: 0, width: 15, height: 15, borderRadius: "50%",
                    background: phase.status === "DONE" ? "var(--neon-green)" : "var(--neon-red)",
                    boxShadow: `0 0 10px ${phase.status === "DONE" ? "var(--neon-green)" : "var(--neon-red)"}`
                  }} />
                  <div style={{ fontFamily: "'Share Tech Mono'", color: "var(--neon-red)", fontSize: "0.7rem", marginBottom: 5 }}>{phase.phase} · {phase.status}</div>
                  <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.2rem", marginBottom: 15 }}>{phase.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {phase.items.map((item, i) => (
                      <span key={i} style={{ padding: "5px 12px", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", background: "rgba(255,255,255,0.03)" }}>
                        {phase.status === "DONE" ? "✓" : "○"} {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid rgba(255,32,32,0.2)", padding: "40px 24px", background: "var(--bg-panel)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span>🍅</span>
              <span className="flicker" style={{ fontFamily: "'Orbitron', monospace", color: "var(--neon-red)" }}>TOMATOCOIN</span>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "var(--text-dim)" }}>
              © 2025 TOMATOCOIN · {time}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}