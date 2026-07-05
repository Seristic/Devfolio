import React from "react";
import { useGitHubData, groupLanguagesByCategory, convertToSkillLevel } from "../hooks/useGitHubData";
import CONFIG from "../config/config";
import useSeasonalTheme from "../hooks/useSeasonalTheme";

const TECH_LIST = ["React", "TypeScript", "JavaScript", "Node.js", "Python", "Java", "Docker", "PostgreSQL", "MongoDB", "AWS", "Git", "Express.js"];

const BAR_GRADIENT = {
  pride: "linear-gradient(90deg, #55CDFC, #F7A8B8)",
  halloween: "linear-gradient(90deg, #FF6B35, #C084FC)",
  christmas: "linear-gradient(90deg, #C41E3A, #FFD700, #165B33)",
  default: "linear-gradient(90deg, var(--rose), var(--plum))",
};

const PRIMARY = { pride: "var(--trans-blue)", halloween: "var(--hw-orange)", christmas: "var(--xmas-red)", default: "var(--rose)" };
const CAT_COLOR = { pride: "var(--trans-blue)", halloween: "var(--hw-purple)", christmas: "var(--xmas-green)", default: "var(--plum)" };

const SkillBar = ({ skill, isGitHubData, barGradient }) => (
  <div style={{ marginBottom: "1.1rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
      <span style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 400, color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
        {isGitHubData && skill.color && (
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: skill.color, display: "inline-block", flexShrink: 0 }} />
        )}
        {skill.name}
      </span>
      <span style={{ fontFamily: "'DM Sans'", fontSize: "11px", color: "var(--mist)" }}>{skill.level}%</span>
    </div>
    <div style={{ background: "var(--champagne)", borderRadius: "100px", height: "3px", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: "100px", width: `${skill.level}%`,
        background: isGitHubData && skill.color ? skill.color : barGradient,
        transition: "width 1s ease-out",
      }} />
    </div>
  </div>
);

const LoadingCard = () => (
  <div className="card" style={{ padding: "1.5rem" }}>
    {[...Array(5)].map((_, i) => (
      <div key={i} style={{ marginBottom: "1rem", animation: "pulse 1.5s ease-in-out infinite" }}>
        <div style={{ height: "10px", background: "var(--champagne)", borderRadius: "2px", width: "30%", marginBottom: "0.4rem" }} />
        <div style={{ height: "3px", background: "var(--champagne)", borderRadius: "100px" }} />
      </div>
    ))}
  </div>
);

const Skills = () => {
  const { theme, isSeasonal } = useSeasonalTheme();
  const { languages, stats, loading, error } = useGitHubData(CONFIG.github.username, {
    token: CONFIG.github.token,
    minPercentage: CONFIG.skills.minLanguagePercentage,
    maxLanguages: CONFIG.skills.maxLanguages,
    enableCache: CONFIG.cache.enabled,
    cacheExpiry: CONFIG.cache.expiryHours * 60 * 60 * 1000,
    includePrivate: CONFIG.github.includePrivateRepos,
    useDetailedStats: CONFIG.skills.useDetailedStats,
  });

  const staticCategories = [
    { title: "Frontend", skills: CONFIG.skills.manual.frontend },
    { title: "Backend", skills: CONFIG.skills.manual.backend },
    { title: "Tools", skills: CONFIG.skills.manual.tools },
  ];

  const gitHubCategories = () => {
    if (!languages.length) return [];
    return groupLanguagesByCategory(languages).map(({ category, languages: langs }) => ({
      title: category,
      skills: langs.map((lang) => ({
        name: lang.config.displayName, level: convertToSkillLevel(lang.percentage, languages.length),
        percentage: lang.percentage, color: lang.config.color,
      })),
    }));
  };

  const useGH = CONFIG.github.enableIntegration && !error && languages.length > 0;
  const skillCategories = useGH ? gitHubCategories() : staticCategories;
  const barGradient = BAR_GRADIENT[theme] || BAR_GRADIENT.default;
  const primary = PRIMARY[theme] || PRIMARY.default;
  const catColor = CAT_COLOR[theme] || CAT_COLOR.default;

  return (
    <section id="skills" style={{ background: "white" }} className="section-padding">
      <div className="container-custom">
        <div className={`section-label${isSeasonal ? ` ${theme}` : ""}`}>Skills</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }} className="skills-grid">
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, color: "var(--ink)", marginBottom: "1.5rem" }}>
              My <em style={{ color: primary, fontStyle: "italic" }}>craft</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 300, lineHeight: 1.8, color: "var(--mist)", marginBottom: "2rem" }}>
              {useGH ? "Pulled live from my GitHub repositories." : "Languages, frameworks, and tools I work with."}
            </p>
            {stats && !loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[{ n: stats.publicRepos, l: "Public repos" }, { n: stats.totalStars, l: "Total stars" }, { n: stats.followers, l: "Followers" }].map(({ n, l }) => (
                  <div key={l} style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 300, color: primary, lineHeight: 1, minWidth: "2.5rem" }}>{n}</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "11px", color: "var(--mist)" }}>{l}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {loading
              ? <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>{[...Array(4)].map((_, i) => <LoadingCard key={i} />)}</div>
              : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {skillCategories.map((cat, i) => (
                  <div key={i} className="card" style={{ padding: "1.5rem" }}>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: catColor, marginBottom: "1.25rem" }}>
                      {cat.title}
                    </p>
                    {cat.skills.map((skill, si) => (
                      <SkillBar key={si} skill={skill} isGitHubData={useGH} barGradient={barGradient} />
                    ))}
                  </div>
                ))}
              </div>
            }

            <div style={{ marginTop: "2.5rem" }}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mist)", marginBottom: "0.85rem" }}>
                Technologies
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {(useGH && languages.length ? languages.slice(0, 12).map((l) => l.config.displayName) : TECH_LIST).map((tech, i) => (
                  <span key={tech} className="pill" style={isSeasonal ? {
                    color: i % 2 === 0 ? primary : (CAT_COLOR[theme] || "var(--plum)"),
                    background: "rgba(0,0,0,0.03)",
                  } : {}}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </section>
  );
};

export default Skills;