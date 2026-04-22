import React, { useState, useEffect } from "react";
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
  body { background: var(--bg-deep); color: #e0e0f0; font-family: 'Rajdhani', sans-serif; overflow-x: hidden; }

  /* ---- LAYOUT UTILS ---- */
  .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  
  /* ---- RESPONSIVE ---- */
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .hero-flex { flex-direction: column-reverse !important; text-align: center; padding-top: 40px !important; }
    .hero-text { display: flex; flex-direction: column; align-items: center; }
    .stats-row { justify-content: center; gap: 20px !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
    .tokenomics-grid { grid-template-columns: 1fr !important; }
    .img-mobile { width: 260px !important; }
  }

  /* ---- DECO & EFFECTS ---- */
  .scanlines::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px);
  }
  .grid-bg {
    background-image: linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* ---- ANIMATIONS ---- */
  @keyframes glitch-1 {
    0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-3px, 0); }
    20% { clip-path: inset(20% 0 60% 0); transform: translate(3px, 0); }
    80% { clip-path: inset(40% 0 40% 0); transform: translate(-3px, 0); }
  }
  .glitch-wrap { position: relative; display: inline-block; }
  .glitch-wrap::before { content: attr(data-text); position: absolute; inset: 0; color: var(--neon-red); animation: glitch-1 3.5s infinite; opacity: 0.8; }
  
  .neon-text { animation: neon-pulse 2.5s ease-in-out infinite; color: var(--neon-red); }
  @keyframes neon-pulse {
    0%,100% { text-shadow: 0 0 6px var(--neon-red), 0 0 18px var(--neon-red); }
    50% { text-shadow: 0 0 12px var(--neon-red), 0 0 30px var(--neon-red); }
  }

  .ticker-track { animation: ticker-scroll 22s linear infinite; white-space: nowrap; display: inline-flex; }
  @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ---- BUTTONS ---- */
  .cta-btn {
    padding: 14px 32px; background: transparent; border: 2px solid var(--neon-red);
    color: #fff; font-family: 'Orbitron', sans-serif; font-weight: 700;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    text-decoration: none; cursor: pointer; transition: 0.3s;
    box-shadow: 0 0 10px rgba(255,32,32,0.3);
  }
  .cta-btn:hover { background: var(--neon-red); color: #000; box-shadow: 0 0 25px var(--neon-red); }
  .cta-btn-green { border-color: var(--neon-green); box-shadow: 0 0 10px rgba(57,255,20,0.2); }
  .cta-btn-green:hover { background: var(--neon-green); box-shadow: 0 0 25px var(--neon-green); }

  .nav-link { font-family: 'Orbitron', sans-serif; font-size: 0.7rem; color: var(--text-dim); text-decoration: none; text-transform: uppercase; letter-spacing: 2px; transition: 0.2s; }
  .nav-link:hover { color: var(--neon-red); }

  .corner-cut { clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px)); }
  
  section { padding: 100px 0; scroll-margin-top: 80px; }
  
  @keyframes image-glow {
    0%,100% { filter: drop-shadow(0 0 15px rgba(255,32,32,0.5)); }
    50% { filter: drop-shadow(0 0 35px rgba(255,32,32,0.8)); }
  }
  .img-glow { animation: image-glow 3s infinite; }
`;

const TICKER_ITEMS = ["$TOMATO", "SOLANA", "NO PRESALE", "BURNED LP", "PURE ORGANIC", "JOIN THE SAUCE 🍅"];

const ROADMAP = [
  { phase: "PHASE 01", title: "GENESIS LAUNCH", status: "DONE", items: ["Token launch", "Community build", "First 1000 holders"] },
  { phase: "PHASE 02", title: "CULTIVATION", status: "ACTIVE", items: ["CG & CMC listing", "Liquidity pool", "Influencer collabs"] },
  { phase: "PHASE 03", title: "DOMINATION", status: "SOON", items: ["CEX listing", "Merch drop", "DAO governance"] },
];

const TOKENOMICS = [
  { label: "Liquidity Pool", value: "90%", desc: "100% Burned at launch. Safe forever." },
  { label: "Marketing", value: "5%", desc: "Spicy partnerships & Ads." },
  { label: "Dev", value: "5%", desc: "Kitchen maintenance." },
  { label: "Tax", value: "0/0", desc: "No buy or sell tax." },
];

const NEWS = [
  { date: "JUL 21 2025", tag: "MILESTONE", title: "1000 followers on X", body: "The 🍅 army is growing. The sauce is spreading fast." },
  { date: "JUN 28 2025", tag: "LAUNCH", title: "TOMATO goes live", body: "$TOMATO launched raw and organic on Solana." },
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
      <div className="scanlines">
        
        {/* ── NAVIGATION ── */}
        <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: "rgba(4,4,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,32,32,0.2)" }}>
          <div className="container" style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>🍅</span>
              <span className="neon-text" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "1.1rem" }}>TOMATO</span>
            </div>
            <div className="nav-links" style={{ display: "flex", gap: 35 }}>
              <a href="#tokenomics" className="nav-link">Tokenomics</a>
              <a href="#roadmap" className="nav-link">Roadmap</a>
              <a href="https://x.com/offtomatocoin" target="_blank" className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.65rem" }}>BUY</a>
            </div>
          </div>
        </nav>

        {/* ── TICKER ── */}
        <div style={{ marginTop: 70, background: "rgba(255,32,32,0.08)", padding: "12px 0", borderBottom: "1px solid rgba(255,32,32,0.2)", overflow: "hidden" }}>
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} style={{ fontFamily: "Share Tech Mono", padding: "0 35px", color: i % 2 === 0 ? "var(--neon-red)" : "#888", letterSpacing: "1px" }}>◆ {item}</span>
            ))}
          </div>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="grid-bg" style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}>
          <div className="container hero-flex" style={{ display: "flex", alignItems: "center", gap: 60 }}>
            <div className="hero-text" style={{ flex: 1 }}>
              <div style={{ color: "var(--neon-green)", fontFamily: "Share Tech Mono", fontSize: "0.8rem", marginBottom: 20 }}>[ STATUS: LIVE ON SOLANA ]</div>
              <h1 style={{ fontFamily: "Orbitron", fontSize: "clamp(45px, 9vw, 100px)", lineHeight: 1, fontWeight: 900 }}>
                <div className="glitch-wrap neon-text" data-text="TOMATO">TOMATO</div><br />
                <span style={{ color: "#fff", fontWeight: 400, letterSpacing: "0.1em" }}>COIN</span>
              </h1>
              <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "#bbbbd0", margin: "30px 0 45px", maxWidth: 550, lineHeight: 1.6 }}>
                The memecoin that <span style={{ color: "var(--neon-red)", fontWeight: 700 }}>refreshes your portfolio</span>. Pure organic fire grown on Solana.
              </p>
              <div className="stats-row" style={{ display: "flex", gap: 40, marginBottom: 50 }}>
                <div><div className="neon-text" style={{ fontSize: "1.8rem", fontWeight: 900 }}>500M</div><div style={{ fontSize: "0.6rem", color: "#666", letterSpacing: "2px" }}>SUPPLY</div></div>
                <div><div className="neon-text" style={{ fontSize: "1.8rem", fontWeight: 900 }}>0%</div><div style={{ fontSize: "0.6rem", color: "#666", letterSpacing: "2px" }}>TAX</div></div>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <a href="https://pump.fun" className="cta-btn">BUY $TOMATO</a>
                <a href="https://t.me/tomatocoinsolana" className="cta-btn cta-btn-green">TELEGRAM</a>
              </div>
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <img src={logoTomato} className="img-mobile img-glow" alt="Tomato Girl" style={{ width: 380, position: "relative" }} />
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section style={{ background: "var(--bg-panel)" }}>
          <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div className="corner-cut" style={{ background: "var(--bg-card)", padding: 40, border: "1px solid rgba(255,32,32,0.2)" }}>
              <div style={{ fontFamily: "Share Tech Mono", color: "var(--neon-green)", marginBottom: 20 }}>$ cat mission.txt</div>
              <p style={{ fontFamily: "Share Tech Mono", fontSize: "0.9rem", lineHeight: 1.8, color: "#c8c8e0" }}>
                <span style={{ color: "var(--neon-red)" }}>&gt;</span> Tomatocoin is a rebellion against tasteless tokens.<br /><br />
                <span style={{ color: "var(--neon-red)" }}>&gt;</span> No VCs. No Presale. Just pure community power.<br /><br />
                <span style={{ color: "var(--neon-red)" }}>&gt;</span> Grown organically on the fastest chain.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {["FAIR LAUNCH", "LOCKED LP", "0% TAX", "SOLANA SPEED"].map(title => (
                <div key={title} style={{ padding: 25, background: "rgba(255,32,32,0.03)", border: "1px solid rgba(255,32,32,0.1)", textAlign: "center" }}>
                  <div style={{ color: "var(--neon-red)", fontFamily: "Orbitron", fontSize: "0.7rem" }}>{title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOKENOMICS SECTION ── */}
        <section id="tokenomics" className="grid-bg">
          <div className="container">
            <h2 style={{ fontFamily: "Orbitron", fontSize: "2.5rem", marginBottom: 60 }}>TOKENOMICS<span className="neon-text">_</span></h2>
            <div className="tokenomics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 25 }}>
              {TOKENOMICS.map((t, i) => (
                <div key={i} className="corner-cut" style={{ background: "var(--bg-card)", padding: 35, border: "1px solid rgba(255,32,32,0.2)" }}>
                  <div style={{ color: "var(--neon-red)", fontSize: "2.2rem", fontWeight: 900, fontFamily: "Orbitron" }}>{t.value}</div>
                  <div style={{ color: "var(--neon-green)", fontFamily: "Share Tech Mono", margin: "15px 0", fontSize: "0.8rem", textTransform: "uppercase" }}>{t.label}</div>
                  <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWS SECTION ── */}
        <section style={{ background: "var(--bg-panel)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50 }}>
              <h2 style={{ fontFamily: "Orbitron", fontSize: "2.5rem" }}>NEWS<span className="neon-text">_</span></h2>
              <div style={{ fontFamily: "Share Tech Mono", color: "#555" }}>{time}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
              {NEWS.map((item, i) => (
                <div key={i} style={{ padding: 30, background: "var(--bg-card)", border: "1px solid rgba(255,32,32,0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
                    <span style={{ fontSize: "0.7rem", color: "#666" }}>{item.date}</span>
                    <span style={{ fontSize: "0.6rem", background: "var(--neon-red)", color: "#000", padding: "2px 8px", fontWeight: "bold" }}>{item.tag}</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "#888", fontSize: "0.9rem" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROADMAP SECTION ── */}
        <section id="roadmap" className="grid-bg">
          <div className="container">
            <h2 style={{ fontFamily: "Orbitron", fontSize: "2.5rem", marginBottom: 60 }}>ROADMAP<span className="neon-text">_</span></h2>
            <div style={{ borderLeft: "2px solid var(--neon-red)", paddingLeft: 40, marginLeft: 10 }}>
              {ROADMAP.map((phase, i) => (
                <div key={i} style={{ marginBottom: 60, position: "relative" }}>
                  <div style={{ position: "absolute", left: "-49px", top: 5, width: 18, height: 18, background: phase.status === "DONE" ? "var(--neon-green)" : "var(--neon-red)", borderRadius: "50%", boxShadow: "0 0 15px currentColor" }} />
                  <div style={{ fontFamily: "Share Tech Mono", color: "var(--neon-red)", fontSize: "0.8rem", letterSpacing: "2px" }}>{phase.phase} · {phase.status}</div>
                  <h3 style={{ fontFamily: "Orbitron", fontSize: "1.5rem", margin: "10px 0 20px" }}>{phase.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {phase.items.map((item, idx) => (
                      <span key={idx} style={{ padding: "6px 15px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", fontSize: "0.8rem", color: "#aaa" }}>
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
        <footer style={{ padding: "60px 0", borderTop: "1px solid rgba(255,32,32,0.2)", background: "var(--bg-panel)", textAlign: "center" }}>
          <div className="container">
            <div style={{ fontSize: "2rem", marginBottom: 20 }}>🍅</div>
            <div style={{ fontFamily: "Orbitron", fontWeight: 900, color: "var(--neon-red)", letterSpacing: "4px", marginBottom: 15 }}>TOMATOCOIN</div>
            <div style={{ fontFamily: "Share Tech Mono", color: "#555", fontSize: "0.75rem" }}>
              © 2026 TOMATOCOIN · NO FINANCIAL ADVICE · DYOR
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}