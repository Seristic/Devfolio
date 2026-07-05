import React from "react";
import useSeasonalTheme from "../hooks/useSeasonalTheme";
import { TransFlag } from "./SeasonalAccent";
import { ObfuscatedEmail } from "../utils/email";

const NAV = [
  { name: "Home", href: "home" }, { name: "About", href: "about" },
  { name: "Skills", href: "skills" }, { name: "Projects", href: "projects" },
  { name: "Contact", href: "contact" },
];

const SOCIAL = [
  { name: "GitHub", url: "https://github.com/Seristic" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/alyssa-blackley/" },
  { name: "X", url: "https://x.com/MistySereen" },
  { name: "Email", url: "#contact" },
];

const LOGO_CLASS = { pride: "seasonal-logo-pride", halloween: "seasonal-logo-halloween", christmas: "seasonal-logo-christmas" };
const NAV_COLOR = { pride: "var(--trans-blue)", halloween: "var(--hw-orange)", christmas: "var(--xmas-red)", default: "var(--rose)" };
const CONT_COLOR = { pride: "var(--trans-pink)", halloween: "var(--hw-purple)", christmas: "var(--xmas-gold)", default: "var(--rose)" };
const HOVER_COLOR = { pride: "var(--trans-pink)", halloween: "var(--hw-orange)", christmas: "var(--xmas-gold)", default: "var(--rose)" };
const BORDER_TOP = { pride: "rgba(85,205,252,0.12)", halloween: "rgba(255,107,53,0.12)", christmas: "rgba(255,215,0,0.12)", default: "rgba(232,180,200,0.1)" };

const SIGNOFF = {
  pride: { node: <TransFlag stripeWidth={22} stripeHeight={3} gap={1.5} opacity={0.6} />, text: "Happy Trans Pride Month 🏳️‍⚧️", color: "rgba(247,168,184,0.7)" },
  halloween: { node: null, text: "🕷️ Happy Halloween 🎃", color: "rgba(255,107,53,0.6)" },
  christmas: { node: null, text: "🎄 Happy Christmas 🎁", color: "rgba(255,215,0,0.65)" },
};

const FOOTER_STRIPES = {
  pride: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  halloween: ["#FF6B35", "#C084FC", "#FF6B35", "#C084FC", "#FF6B35"],
  christmas: ["#C41E3A", "#FFD700", "#165B33", "#FFD700", "#C41E3A"],
};

const Footer = () => {
  const { theme, isSeasonal } = useSeasonalTheme();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const dimLink = { fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 400, letterSpacing: "0.04em", color: "rgba(253,251,252,0.45)", background: "none", border: "none", cursor: "pointer", textDecoration: "none", transition: "color 0.2s", padding: 0 };
  const hoverC = HOVER_COLOR[theme] || HOVER_COLOR.default;
  const signoff = isSeasonal ? SIGNOFF[theme] : null;

  return (
    <footer style={{ background: "var(--ink)", color: "var(--page)" }}>
      {/* Seasonal stripe across top of footer */}
      {isSeasonal && (
        <div style={{ display: "flex", height: "4px" }}>
          {FOOTER_STRIPES[theme].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c, opacity: 0.55 }} />
          ))}
        </div>
      )}

      <div className="container-custom">
        <div style={{ paddingTop: "3.5rem", paddingBottom: "3rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem" }} className="footer-grid">

          {/* Brand */}
          <div>
            <button onClick={scrollToTop}
              className={isSeasonal ? LOGO_CLASS[theme] : ""}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, fontStyle: "italic", color: "var(--rose)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "1rem", display: "block" }}
            >
              Alyssa
            </button>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 300, lineHeight: 1.8, color: "rgba(253,251,252,0.4)", maxWidth: "320px", marginBottom: "1.5rem" }}>
              Full stack developer building accessible, inclusive tech — software that treats people as people.
            </p>

            {signoff && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.25rem" }}>
                {signoff.node}
                <span style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 400, letterSpacing: "0.1em", color: signoff.color }}>
                  {signoff.text}
                </span>
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem" }}>
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={s.url === "#contact" ? (e) => { e.preventDefault(); scrollTo("contact"); } : undefined}
                  title={s.name} style={dimLink}
                  onMouseEnter={(e) => (e.currentTarget.style.color = hoverC)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,251,252,0.45)")}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: NAV_COLOR[theme] || NAV_COLOR.default, marginBottom: "1rem" }}>
              Navigate
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {NAV.map((item) => (
                <li key={item.name}>
                  <button onClick={() => scrollTo(item.href)} style={dimLink}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,251,252,0.45)")}>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: CONT_COLOR[theme] || CONT_COLOR.default, marginBottom: "1rem" }}>
              Get in touch
            </p>
            {/* Obfuscated email — assembled by JS only */}
            <ObfuscatedEmail
              style={{ fontFamily: "'DM Sans'", fontSize: "11px", display: "block", marginBottom: "0.5rem", color: "rgba(253,251,252,0.45)", textDecoration: "none", transition: "color 0.2s" }}
            />
            <a href="https://seristic.com" target="_blank" rel="noopener noreferrer"
              style={dimLink}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,251,252,0.45)")}
            >
              seristic.com
            </a>
          </div>
        </div>

        <div style={{ paddingTop: "1.25rem", paddingBottom: "1.75rem", borderTop: `1px solid ${BORDER_TOP[theme] || BORDER_TOP.default}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "11px", color: "rgba(253,251,252,0.25)" }}>
            © {new Date().getFullYear()} Alyssa. All rights reserved.
          </span>
          <button onClick={scrollToTop}
            style={{ ...dimLink, display: "flex", alignItems: "center", gap: "0.4rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = hoverC)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,251,252,0.45)")}
          >
            Back to top
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }`}</style>
    </footer>
  );
};

export default Footer;