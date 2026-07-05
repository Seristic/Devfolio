import React, { useState } from "react";
import useSeasonalTheme from "../hooks/useSeasonalTheme";
import { TransFlag } from "./SeasonalAccent";
import { ObfuscatedEmail, getMailto } from "../utils/email";

const SOCIAL = [
  { name: "GitHub", url: "https://github.com/Seristic" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/alyssa-blackley/" },
  { name: "X", url: "https://x.com/MistySereen" },
];

const PRIMARY = { pride: "var(--trans-blue)", halloween: "var(--hw-orange)", christmas: "var(--xmas-red)", default: "var(--rose)" };
const SECONDARY = { pride: "var(--trans-pink)", halloween: "var(--hw-purple)", christmas: "var(--xmas-gold)", default: "var(--rose)" };
const BTN_STYLE = {
  pride: { background: "var(--trans-pink)", borderColor: "var(--trans-pink)", color: "var(--ink)" },
  halloween: { background: "var(--hw-orange)", borderColor: "var(--hw-orange)", color: "var(--hw-dark)" },
  christmas: { background: "var(--xmas-red)", borderColor: "var(--xmas-red)", color: "var(--xmas-warm)" },
};

const CARD_STRIPES = {
  pride: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  halloween: ["#FF6B35", "#C084FC", "#FF6B35", "#C084FC", "#FF6B35"],
  christmas: ["#C41E3A", "#FFD700", "#165B33", "#FFD700", "#C41E3A"],
};

const SEASONAL_NOTE = {
  pride: { icon: <TransFlag stripeWidth={28} stripeHeight={3} gap={2} opacity={0.55} />, text: "Happy Pride 🏳️‍⚧️", color: "var(--trans-pink)" },
  halloween: { icon: null, text: "👻 Don't be a stranger...", color: "var(--hw-purple)" },
  christmas: { icon: null, text: "🎄 Season's greetings!", color: "var(--xmas-gold)" },
};

const labelStyle = {
  display: "block", fontFamily: "'DM Sans', sans-serif",
  fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em",
  textTransform: "uppercase", color: "var(--mist)", marginBottom: "0.4rem",
};

const Contact = () => {
  const { theme, isSeasonal } = useSeasonalTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFoc] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const primary = PRIMARY[theme] || PRIMARY.default;
  const secondary = SECONDARY[theme] || SECONDARY.default;
  const btnStyle = isSeasonal ? BTN_STYLE[theme] : null;
  const note = isSeasonal ? SEASONAL_NOTE[theme] : null;
  const stripes = isSeasonal ? CARD_STRIPES[theme] : null;

  const inputStyle = (field) => ({
    width: "100%", fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 300,
    color: "var(--ink)", background: "white", border: "1px solid",
    borderColor: focused === field ? primary : "var(--champagne)",
    borderRadius: "2px", padding: "0.75rem 1rem", outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box",
  });

  return (
    <section id="contact" style={{ background: "white" }} className="section-padding">
      <div className="container-custom">
        <div className={`section-label${isSeasonal ? ` ${theme}` : ""}`}>Contact</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }} className="contact-grid">

          {/* Left */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, color: "var(--ink)", marginBottom: "1.5rem" }}>
              Let's <em style={{ color: primary, fontStyle: "italic" }}>connect</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 300, lineHeight: 1.8, color: "var(--mist)", marginBottom: "2.5rem" }}>
              I'm always open to discussing new projects, interesting opportunities, or just having a chat about technology.
            </p>

            {/* Email — obfuscated, never a raw string in the DOM */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                marginBottom: "2.5rem", padding: "1rem",
                border: "1px solid var(--champagne)", borderRadius: "4px",
                background: "var(--rose-pale)", transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              onClick={() => { window.location.href = getMailto(); }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = secondary)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--champagne)")}
            >
              <div style={{ width: "36px", height: "36px", background: "white", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", color: primary, flexShrink: 0 }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: "9px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mist)" }}>Email</div>
                {/* ObfuscatedEmail renders the address via JS only — never in static HTML */}
                <ObfuscatedEmail style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "var(--ink)", textDecoration: "none" }} />
              </div>
            </div>

            {/* Social */}
            <div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "0.75rem" }}>Find me on</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {SOCIAL.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                    style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.4rem 0.75rem", border: "1px solid var(--champagne)", borderRadius: "2px", color: "var(--mist)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.color = primary; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--champagne)"; e.currentTarget.style.color = "var(--mist)"; }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Seasonal note */}
            {note && (
              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {note.icon}
                <span style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 400, letterSpacing: "0.1em", color: note.color, opacity: 0.85 }}>
                  {note.text}
                </span>
              </div>
            )}
          </div>

          {/* Right — form */}
          <div className="card" style={{ padding: "2rem" }}>
            {isSeasonal && (
              <div style={{ display: "flex", height: "3px", marginBottom: "1.5rem", borderRadius: "2px", overflow: "hidden" }}>
                {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c, opacity: 0.65 }} />)}
              </div>
            )}

            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: primary, fontStyle: "italic", marginBottom: "0.5rem" }}>
                  Message sent.
                </p>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "var(--mist)" }}>I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your name"
                      style={inputStyle("name")} onFocus={() => setFoc("name")} onBlur={() => setFoc(null)} />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com"
                      style={inputStyle("email")} onFocus={() => setFoc("email")} onBlur={() => setFoc(null)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" style={labelStyle}>Subject</label>
                  <input id="subject" name="subject" type="text" required value={form.subject} onChange={handleChange} placeholder="What's this about?"
                    style={inputStyle("subject")} onFocus={() => setFoc("subject")} onBlur={() => setFoc(null)} />
                </div>
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or just say hello."
                    style={{ ...inputStyle("message"), resize: "none" }}
                    onFocus={() => setFoc("message")} onBlur={() => setFoc(null)} />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", ...(btnStyle || {}) }}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </section>
  );
};

export default Contact;