import React, { useState, useEffect } from "react";
import useSeasonalTheme from "../hooks/useSeasonalTheme";

const NAV_ITEMS = ["Home", "About", "Skills", "Projects", "Contact"];

const LOGO_CLASS = {
  pride: "seasonal-logo-pride",
  halloween: "seasonal-logo-halloween",
  christmas: "seasonal-logo-christmas",
};

const HOVER_COLOR = {
  pride: "var(--trans-pink)",
  halloween: "var(--hw-orange)",
  christmas: "var(--xmas-gold)",
  default: "var(--rose)",
};

const MOBILE_STRIPES = {
  pride: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  halloween: ["#FF6B35", "#C084FC", "#FF6B35", "#C084FC", "#FF6B35"],
  christmas: ["#C41E3A", "#FFD700", "#165B33", "#FFD700", "#C41E3A"],
};

const Header = () => {
  const { theme, isSeasonal } = useSeasonalTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  const hoverColor = HOVER_COLOR[theme] || HOVER_COLOR.default;
  const logoClass = isSeasonal ? LOGO_CLASS[theme] : "";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.3s, box-shadow 0.3s",
      background: isScrolled ? "rgba(253,251,252,0.96)" : "transparent",
      backdropFilter: isScrolled ? "blur(8px)" : "none",
      boxShadow: isScrolled ? "0 1px 0 #F0E6ED" : "none",
    }}>
      <nav className="container-custom">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

          {/* Logo — one name only, seasonal shimmer */}
          <button
            onClick={() => scrollTo("home")}
            className={logoClass}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic",
              color: "var(--rose)",
              background: "none", border: "none", cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            Alyssa
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: isScrolled ? "var(--mist)" : "var(--page)",
                  background: "none", border: "none", cursor: "pointer",
                  transition: "color 0.2s", padding: "0.25rem 0",
                }}
                onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                onMouseLeave={(e) => (e.target.style.color = isScrolled ? "var(--mist)" : "var(--page)")}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: isScrolled ? "var(--ink)" : "var(--page)", padding: "0.25rem",
            }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div style={{
            background: "rgba(253,251,252,0.98)", backdropFilter: "blur(8px)",
            borderTop: "1px solid var(--champagne)", padding: "1rem 0 1.5rem",
          }}>
            {isSeasonal && (
              <div style={{ display: "flex", height: "3px", marginBottom: "0.75rem" }}>
                {MOBILE_STRIPES[theme].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c, opacity: 0.6 }} />
                ))}
              </div>
            )}
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--mist)", background: "none", border: "none",
                  cursor: "pointer", padding: "0.6rem 0",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;