import React from "react";
import useSeasonalTheme from "../hooks/useSeasonalTheme";
import { TransFlag } from "./SeasonalAccent";

const STATS = [
  { value: "8+", label: "Years coding" },
  { value: "4", label: "Years of Computing at university" },
  { value: "OSS", label: "Open source advocate" },
];

const VALUES = [
  "Accessibility-first design for marginalised communities",
  "Clean, maintainable, purposeful code",
  "Open source contribution and collaboration",
  "LGBTQ+ advocacy through technology",
];

const PRIMARY = {
  pride: "var(--trans-blue)",
  halloween: "var(--hw-orange)",
  christmas: "var(--xmas-red)",
  default: "var(--rose)",
};

const SECONDARY = {
  pride: "var(--trans-pink)",
  halloween: "var(--hw-purple)",
  christmas: "var(--xmas-gold)",
  default: "var(--rose-light)",
};

const About = () => {
  const { theme, isSeasonal, isPride, isHalloween, isChristmas } = useSeasonalTheme();
  const primary = PRIMARY[theme] || PRIMARY.default;
  const secondary = SECONDARY[theme] || SECONDARY.default;

  return (
    <section id="about" style={{ background: "var(--page)" }} className="section-padding">
      <div className="container-custom">
        <div className={`section-label${isSeasonal ? ` ${theme}` : ""}`}>About</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
          className="about-grid">

          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.1, color: "var(--ink)", marginBottom: "2.5rem",
            }}>
              Building things that{" "}
              <em style={{ color: primary, fontStyle: "italic" }}>matter</em>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {STATS.map(({ value, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.25rem", fontWeight: 300,
                    color: primary, lineHeight: 1, minWidth: "3.5rem",
                  }}>
                    {value}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--mist)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Seasonal accent */}
            {isPride && (
              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <TransFlag stripeWidth={32} stripeHeight={4} gap={2} opacity={0.6} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--trans-pink)", opacity: 0.8 }}>
                  Trans · she/her
                </span>
              </div>
            )}
            {isHalloween && (
              <p style={{ marginTop: "2rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, fontStyle: "italic", color: "var(--hw-purple)", opacity: 0.7 }}>
                🕷️ Beware the bugs in production...
              </p>
            )}
            {isChristmas && (
              <p style={{ marginTop: "2rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, fontStyle: "italic", color: "var(--xmas-gold)", opacity: 0.75 }}>
                🎄 Wishing you a wonderful Christmas.
              </p>
            )}
          </div>

          {/* Right */}
          <div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "var(--mist)", marginBottom: "1.25rem" }}>
              I'm a self-taught full-stack developer who's been coding since I was 15,
              with four years of university studying Computing. I've built web apps,
              Discord bots, utility programs, APIs, IDE extensions, and done Java
              development across that time.
            </p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "var(--mist)", marginBottom: "2.5rem" }}>
              I like solving complicated problems and turning them into simple,
              clean, easy-to-use solutions. I'm a big believer in open source and
              contributing code where I can.
            </p>

            <div style={{ borderLeft: `2px solid ${secondary}`, paddingLeft: "1.25rem" }}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.85rem" }}>
                What I care about
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {VALUES.map((v) => (
                  <li key={v} style={{ fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 300, color: "var(--mist)", display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <span style={{ color: secondary, marginTop: "0.45em", flexShrink: 0, fontSize: "8px" }}>◆</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </section>
  );
};

export default About;