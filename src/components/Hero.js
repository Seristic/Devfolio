import React from "react";
import useSeasonalTheme from "../hooks/useSeasonalTheme";
import { TransFlag, SpiderWeb, Snowflake } from "./SeasonalAccent";
import { getMailto } from "../utils/email";

const STRIPES = {
  pride: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  halloween: ["#FF6B35", "#C084FC", "#FF6B35", "#C084FC", "#FF6B35"],
  christmas: ["#C41E3A", "#FFD700", "#165B33", "#FFD700", "#C41E3A"],
};

const CORNER_TINT = {
  pride: "linear-gradient(135deg, transparent 55%, rgba(85,205,252,0.04) 100%)",
  halloween: "linear-gradient(135deg, transparent 50%, rgba(192,132,252,0.07) 100%)",
  christmas: "linear-gradient(135deg, transparent 50%, rgba(196,30,58,0.06) 100%)",
  default: "linear-gradient(135deg, transparent 60%, rgba(196,112,138,0.06) 100%)",
};

const TOP_RULE = {
  pride: "linear-gradient(90deg, transparent, rgba(85,205,252,0.15), rgba(247,168,184,0.15), transparent)",
  halloween: "linear-gradient(90deg, transparent, rgba(255,107,53,0.2), rgba(192,132,252,0.2), transparent)",
  christmas: "linear-gradient(90deg, transparent, rgba(196,30,58,0.2), rgba(255,215,0,0.2), rgba(22,91,51,0.2), transparent)",
  default: "rgba(232,180,200,0.12)",
};

const BADGE = {
  pride: { bg: "rgba(247,168,184,0.06)", border: "rgba(247,168,184,0.3)", text: "#F7A8B8", label: "Happy Pride Month 🏳️‍⚧️" },
  halloween: { bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.3)", text: "#FF6B35", label: "Happy Halloween 🎃" },
  christmas: { bg: "rgba(255,215,0,0.06)", border: "rgba(255,215,0,0.3)", text: "#FFD700", label: "Happy Christmas 🎄" },
};

const DIVIDER = {
  pride: "linear-gradient(90deg, #55CDFC, #F7A8B8)",
  halloween: "linear-gradient(90deg, #FF6B35, #C084FC)",
  christmas: "linear-gradient(90deg, #C41E3A, #FFD700, #165B33)",
  default: "var(--rose)",
};

const BTN = {
  pride: { bg: "#F7A8B8", border: "#F7A8B8", color: "#1A1118" },
  halloween: { bg: "#FF6B35", border: "#FF6B35", color: "#1A0A2E" },
  christmas: { bg: "#C41E3A", border: "#C41E3A", color: "#F8F4E3" },
};

const Hero = () => {
  const { theme, isSeasonal, isPride, isHalloween, isChristmas } = useSeasonalTheme();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const badge = isSeasonal ? BADGE[theme] : null;
  const divider = DIVIDER[theme] || DIVIDER.default;
  const btnStyle = isSeasonal ? BTN[theme] : null;
  const stripes = isSeasonal ? STRIPES[theme] : null;

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: isHalloween ? "#0D0118" : "var(--ink)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Corner tint */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "100%",
        background: CORNER_TINT[theme] || CORNER_TINT.default,
        pointerEvents: "none",
      }} />

      {/* Top rule */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "64px", left: 0, right: 0, height: "1px",
        background: TOP_RULE[theme] || TOP_RULE.default,
      }} />

      {/* Bottom stripe bar */}
      {isSeasonal && (
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          display: "flex", height: "4px",
        }}>
          {stripes.map((c, i) => (
            <div key={i} style={{ flex: 1, background: c, opacity: 0.55 }} />
          ))}
        </div>
      )}

      {/* Halloween spiderweb corners */}
      {isHalloween && (
        <>
          <div style={{ position: "absolute", top: "64px", right: 0, opacity: 1 }}>
            <SpiderWeb size={160} opacity={0.22} />
          </div>
          <div style={{ position: "absolute", bottom: "4px", left: 0, transform: "scaleX(-1)", opacity: 1 }}>
            <SpiderWeb size={100} opacity={0.14} />
          </div>
        </>
      )}

      {/* Christmas snowflakes scattered in background */}
      {isChristmas && (
        <>
          <div style={{ position: "absolute", top: "120px", right: "8%" }}>
            <Snowflake size={50} color="#FFD700" opacity={0.18} />
          </div>
          <div style={{ position: "absolute", top: "35%", right: "18%" }}>
            <Snowflake size={30} color="#C41E3A" opacity={0.14} />
          </div>
          <div style={{ position: "absolute", bottom: "20%", right: "6%" }}>
            <Snowflake size={40} color="#165B33" opacity={0.16} />
          </div>
          <div style={{ position: "absolute", top: "55%", left: "4%" }}>
            <Snowflake size={24} color="#FFD700" opacity={0.12} />
          </div>
        </>
      )}

      <div className="container-custom" style={{ paddingTop: "80px", paddingBottom: "80px", width: "100%" }}>
        <div style={{ maxWidth: "800px" }}>

          {/* Seasonal badge */}
          {badge && (
            <div className="animate-fade-in" style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              marginBottom: "1.25rem", padding: "0.35rem 0.85rem",
              border: `1px solid ${badge.border}`,
              borderRadius: "100px", background: badge.bg,
            }}>
              {isPride && <TransFlag stripeWidth={16} stripeHeight={2.5} gap={1.5} opacity={0.9} />}
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: badge.text,
              }}>
                {badge.label}
              </span>
            </div>
          )}

          {/* Eyebrow */}
          <p className="animate-fade-in" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: isSeasonal ? `${badge?.text}99` : "var(--rose)",
            marginBottom: "1.5rem",
          }}>
            she / her · transfem dev · full stack developer
          </p>

          {/* Name — just "Alyssa", seasonal colours */}
          <h1 className="animate-slide-up" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            lineHeight: 0.95, letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}>
            {isChristmas ? (
              /* Christmas: gradient across all three xmas colours */
              <span className="xmas-gradient-text" style={{ display: "block" }}>
                Alyssa
              </span>
            ) : isPride ? (
              <span style={{ color: "var(--trans-blue)", display: "block" }}>Alyssa</span>
            ) : isHalloween ? (
              <span style={{ color: "var(--hw-orange)", display: "block" }}>Alyssa</span>
            ) : (
              <>
                <span style={{ color: "var(--page)", display: "block" }}>Alyssa</span>
              </>
            )}
          </h1>

          {/* Divider */}
          <div style={{
            width: "48px", height: "1px",
            background: divider, marginBottom: "1.75rem",
          }} />

          {/* Description */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem", fontWeight: 300, lineHeight: 1.8,
            color: "rgba(253,251,252,0.6)",
            maxWidth: "480px", marginBottom: "2.5rem",
          }}>
            Self-taught, building since 15. I turn complicated problems into
            clean, intuitive solutions — software that treats people as people.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              className="btn-primary"
              onClick={() => scrollTo("projects")}
              style={btnStyle ? {
                background: btnStyle.bg,
                borderColor: btnStyle.border,
                color: btnStyle.color,
              } : {}}
            >
              View my work
            </button>
            <button
              className="btn-ghost"
              onClick={() => scrollTo("contact")}
              style={{ color: "var(--page)", borderColor: "rgba(232,180,200,0.4)" }}
              onMouseEnter={(e) => {
                const c = isPride ? "var(--trans-blue)" : isHalloween ? "var(--hw-purple)" : isChristmas ? "var(--xmas-gold)" : "var(--rose)";
                e.currentTarget.style.color = c;
                e.currentTarget.style.borderColor = c;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--page)";
                e.currentTarget.style.borderColor = "rgba(232,180,200,0.4)";
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      {isPride && (
        <div style={{ position: "absolute", bottom: "3rem", right: "2rem", zIndex: 10 }}>
          <TransFlag stripeWidth={40} stripeHeight={6} gap={3} opacity={0.5} />
        </div>
      )}

      {/* Scroll indicator */}
      <button onClick={() => scrollTo("about")} aria-label="Scroll to about"
        style={{
          position: "absolute", bottom: isSeasonal ? "1.5rem" : "2rem",
          left: "50%",
          animation: "bounce 2s infinite",
          background: "none", border: "none", cursor: "pointer",
          color: isSeasonal ? `${badge?.text}80` : "rgba(232,180,200,0.5)",
        }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;