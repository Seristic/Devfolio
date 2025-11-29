import React, { useState, useEffect } from "react";
import { GitHubService } from "../services/githubService";
import { CONFIG } from "../config/config";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      if (!CONFIG.github.enableIntegration || !CONFIG.github.username) {
        setLoading(false);
        return;
      }

      try {
        const githubService = new GitHubService(
          CONFIG.github.username,
          CONFIG.github.token
        );

        const repos = await githubService.getRepositories(50, CONFIG.github.includePrivateRepos);

        // Get starred repositories
        const starredRepos = await githubService.getStarredRepositories().catch(() => []);
        const starredRepoIds = new Set(starredRepos.map(r => r.id));

        // Define projects to exclude (old/dated projects)
        const excludedProjects = [
          '1.7-Banned-Items',
          '1-7-Banned-Items',
          'test', // Add any other repo names you want to exclude
        ];

        // Calculate 6 months ago
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // Filter and transform repositories into projects
        const filteredProjects = repos
          .filter(repo => {
            // Exclude forked repos
            if (repo.fork) return false;

            // Exclude repos without descriptions
            if (!repo.description) return false;

            // Exclude manually specified old projects
            const repoName = repo.name.toLowerCase().replace(/[-_]/g, '');
            if (excludedProjects.some(excluded => repoName.includes(excluded.toLowerCase().replace(/[-_]/g, '')))) {
              return false;
            }

            // Include if: starred, has significant stars (3+), or updated in last 6 months
            const isStarred = starredRepoIds.has(repo.id);
            const hasStars = repo.stargazers_count >= 3;
            const isRecent = new Date(repo.updated_at) > sixMonthsAgo;

            return isStarred || hasStars || isRecent;
          })
          .sort((a, b) => {
            // Prioritize starred repos
            const aStarred = starredRepoIds.has(a.id);
            const bStarred = starredRepoIds.has(b.id);
            if (aStarred !== bStarred) return bStarred ? 1 : -1;

            // Then sort by stars
            if (a.stargazers_count !== b.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }

            // Finally by last updated
            return new Date(b.updated_at) - new Date(a.updated_at);
          })
          .slice(0, 12) // Limit to 12 best projects
          .map(repo => ({
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || "No description available",
            technologies: repo.language ? [repo.language] : [],
            category: categorizeProject(repo),
            liveUrl: repo.homepage || (repo.has_pages ? `https://${CONFIG.github.username}.github.io/${repo.name}` : null),
            githubUrl: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            updatedAt: repo.updated_at,
          }));

        setProjects(filteredProjects);
      } catch (err) {
        console.error("Failed to fetch GitHub projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  // Categorize project based on repository data
  const categorizeProject = (repo) => {
    const language = repo.language?.toLowerCase() || '';
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();

    // Frontend languages/frameworks
    if (['javascript', 'typescript', 'html', 'css', 'vue', 'svelte'].includes(language) ||
      name.includes('react') || name.includes('vue') || name.includes('angular') ||
      description.includes('frontend') || description.includes('ui') || description.includes('website')) {
      return 'frontend';
    }

    // Backend languages/frameworks
    if (['python', 'java', 'go', 'rust', 'php', 'ruby', 'c#', 'c++'].includes(language) ||
      name.includes('api') || name.includes('server') || name.includes('backend') ||
      description.includes('backend') || description.includes('api') || description.includes('server')) {
      return 'backend';
    }

    // Full-stack indicators
    if (name.includes('fullstack') || description.includes('fullstack') ||
      description.includes('full stack') || description.includes('full-stack')) {
      return 'fullstack';
    }

    // Default categorization
    return 'frontend';
  };

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Full Stack" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const ProjectCard = ({ project }) => (
    <div className="card overflow-hidden group">
      {/* Project Header with Language & Stats */}
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center p-6">
          {/* Language Badge */}
          {project.language && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {project.language}
              </span>
            </div>
          )}

          {/* GitHub Stats */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {project.stars > 0 && (
              <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 8l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {project.forks}
              </span>
            )}
          </div>

          {/* Project Icon */}
          <div className="text-primary-600 mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Live Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              View Code
            </a>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Last Updated */}
        <div className="text-xs text-gray-500">
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {CONFIG.github.enableIntegration
              ? "My latest GitHub repositories and projects, automatically updated from my GitHub profile."
              : "Here are some of the projects I've worked on. Each project represents a unique challenge and learning opportunity."}
          </p>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-gray-600">Loading projects from GitHub...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-red-700">
                <strong>Error loading projects:</strong> {error}
              </p>
              <p className="text-red-600 text-sm mt-2">
                Projects will be available once GitHub integration is properly configured.
              </p>
            </div>
          )}

          {/* Filter Buttons - Only show if we have projects */}
          {!loading && !error && projects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${activeFilter === filter.id
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-4">
              {CONFIG.github.enableIntegration
                ? "No public repositories found. Make sure your GitHub username is correct and you have public repositories."
                : "Projects will be displayed here once configured."}
            </p>
          </div>
        )}

        {/* View More Button - Only show if we have projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => window.open(`https://github.com/${CONFIG.github.username}`, "_blank")}
              className="btn-primary hover:scale-105 transform transition-all duration-200"
            >
              View More Projects on GitHub
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
