import React, { useState, useEffect } from "react";
import { GitHubService } from "../services/githubService";
import { CONFIG } from "../config/config";
import useSeasonalTheme from "../hooks/useSeasonalTheme";

const FILTERS = [
  { id: "all", label: "All" }, { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" }, { id: "fullstack", label: "Full stack" },
];

const categorize = (repo) => {
  const lang = repo.language?.toLowerCase() || "";
  const name = repo.name.toLowerCase();
  const desc = (repo.description || "").toLowerCase();
  if (["javascript", "typescript", "html", "css", "vue", "svelte"].includes(lang) || desc.includes("frontend") || desc.includes("ui")) return "frontend";
  if (["python", "java", "go", "rust", "php", "ruby", "c#", "c++"].includes(lang) || name.includes("api") || desc.includes("backend")) return "backend";
  if (desc.includes("fullstack") || desc.includes("full stack") || desc.includes("full-stack")) return "fullstack";
  return "frontend";
};

const CARD_BAR = {
  pride: "linear-gradient(90deg, #55CDFC, #F7A8B8, #fff, #F7A8B8, #55CDFC)",
  halloween: "linear-gradient(90deg, #FF6B35, #C084FC, #FF6B35)",
  christmas: "linear-gradient(90deg, #C41E3A, #FFD700, #165B33)",
  default: "linear-gradient(90deg, var(--rose), var(--plum))",
};

const ACTIVE_FILTER = {
  pride: "#55CDFC", halloween: "#FF6B35", christmas: "#C41E3A", default: "var(--rose)",
};

const LINK_COLOR = {
  pride: "#F7A8B8", halloween: "#FF6B35", christmas: "#C41E3A", default: "var(--rose)",
};

const ProjectCard = ({ project, theme }) => (
  <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <div style={{ height: "3px", background: CARD_BAR[theme] || CARD_BAR.default }} />
    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2 }}>
          {project.title}
        </h3>
        {project.stars > 0 && (
          <span style={{ fontFamily: "'DM Sans'", fontSize: "10px", color: "var(--mist)", display: "flex", alignItems: "center", gap: "0.2rem", flexShrink: 0, marginLeft: "0.75rem" }}>
            <svg width="10" height="10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {project.stars}
          </span>
        )}
      </div>
      {project.language && <span className="pill" style={{ marginBottom: "0.75rem", alignSelf: "flex-start" }}>{project.language}</span>}
      <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 300, lineHeight: 1.75, color: "var(--mist)", flex: 1, marginBottom: "1.25rem" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--champagne)" }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: "10px", color: "var(--mist)" }}>
          {new Date(project.updatedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
        </span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: LINK_COLOR[theme] || LINK_COLOR.default, textDecoration: "none" }}>
              Live ↗
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mist)", textDecoration: "none" }}>
            Code ↗
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { theme, isSeasonal } = useSeasonalTheme();
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!CONFIG.github.enableIntegration || !CONFIG.github.username) { setLoading(false); return; }
      try {
        const svc = new GitHubService(CONFIG.github.username, CONFIG.github.token);
        const repos = await svc.getRepositories(50, CONFIG.github.includePrivateRepos);
        const starred = await svc.getStarredRepositories().catch(() => []);
        const starredIds = new Set(starred.map((r) => r.id));
        const sixMoAgo = new Date(); sixMoAgo.setMonth(sixMoAgo.getMonth() - 6);
        const excluded = ["1.7-Banned-Items", "1-7-Banned-Items", "test"];

        const filtered = repos
          .filter((r) => {
            if (r.fork || !r.description) return false;
            const n = r.name.toLowerCase().replace(/[-_]/g, "");
            if (excluded.some((e) => n.includes(e.toLowerCase().replace(/[-_]/g, "")))) return false;
            return starredIds.has(r.id) || r.stargazers_count >= 3 || new Date(r.updated_at) > sixMoAgo;
          })
          .sort((a, b) => {
            const as = starredIds.has(a.id), bs = starredIds.has(b.id);
            if (as !== bs) return bs ? 1 : -1;
            if (a.stargazers_count !== b.stargazers_count) return b.stargazers_count - a.stargazers_count;
            return new Date(b.updated_at) - new Date(a.updated_at);
          })
          .slice(0, 12)
          .map((r) => ({
            id: r.id,
            title: r.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            description: r.description, category: categorize(r),
            liveUrl: r.homepage || (r.has_pages ? `https://${CONFIG.github.username}.github.io/${r.name}` : null),
            githubUrl: r.html_url, stars: r.stargazers_count,
            forks: r.forks_count, language: r.language, updatedAt: r.updated_at,
          }));
        setProjects(filtered);
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    };
    load();
  }, []);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const activeColor = ACTIVE_FILTER[theme] || ACTIVE_FILTER.default;

  return (
    <section id="projects" style={{ background: "var(--rose-pale)" }} className="section-padding">
      <div className="container-custom">
        <div className={`section-label${isSeasonal ? ` ${theme}` : ""}`}>Projects</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, color: "var(--ink)" }}>
            What I've <em style={{ color: LINK_COLOR[theme] || LINK_COLOR.default, fontStyle: "italic" }}>built</em>
          </h2>

          {!loading && projects.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {FILTERS.map((f) => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "0.35rem 0.85rem", borderRadius: "100px", border: "1px solid",
                  borderColor: filter === f.id ? activeColor : "var(--rose-light)",
                  background: filter === f.id ? activeColor : "transparent",
                  color: filter === f.id ? "white" : "var(--mist)",
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card" style={{ minHeight: "220px", padding: "1.5rem" }}>
                <div style={{ height: "3px", background: "var(--champagne)", marginBottom: "1.5rem" }} />
                <div style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
                  <div style={{ height: "14px", background: "var(--champagne)", borderRadius: "2px", width: "60%", marginBottom: "0.75rem" }} />
                  <div style={{ height: "60px", background: "var(--champagne)", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ padding: "1.5rem", border: "1px solid var(--rose-light)", borderRadius: "4px", background: "white" }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "var(--mist)" }}>Could not load GitHub projects.</p>
          </div>
        )}

        {!loading && !error && visible.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {visible.map((p) => <ProjectCard key={p.id} project={p} theme={theme} />)}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "var(--mist)", fontStyle: "italic" }}>No projects found yet.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button className="btn-ghost" onClick={() => window.open(`https://github.com/${CONFIG.github.username}`, "_blank")}>
              View all on GitHub ↗
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;