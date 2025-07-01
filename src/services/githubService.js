// GitHub API service for fetching user data and repository languages
const GITHUB_API_BASE = "https://api.github.com";

export class GitHubService {
  constructor(username, token = null) {
    this.username = username;
    this.token = token; // Optional personal access token for higher rate limits
  }

  // Helper method to make API requests
  async makeRequest(endpoint) {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "DevFolio-Portfolio",
    };

    // Add authorization header if token is provided
    if (this.token) {
      headers["Authorization"] = `token ${this.token}`;
    }

    try {
      const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `GitHub API Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("GitHub API request failed:", error);
      throw error;
    }
  }

  // Get user profile information
  async getUserProfile() {
    return await this.makeRequest(`/users/${this.username}`);
  }

  // Get all repositories (public and private if token has access)
  async getRepositories(per_page = 100, includePrivate = false) {
    const endpoint =
      includePrivate && this.token
        ? `/user/repos?per_page=${per_page}&sort=updated&affiliation=owner`
        : `/users/${this.username}/repos?per_page=${per_page}&sort=updated`;

    return await this.makeRequest(endpoint);
  }

  // Get languages for a specific repository
  async getRepositoryLanguages(repoName, repoOwner = null) {
    const owner = repoOwner || this.username;
    return await this.makeRequest(`/repos/${owner}/${repoName}/languages`);
  }

  // Get aggregated language statistics across all repositories
  async getAllLanguageStats(includePrivate = false) {
    try {
      const repos = await this.getRepositories(100, includePrivate);
      const languageStats = {};
      let totalBytes = 0;

      console.log(
        `Analyzing ${repos.length} repositories${
          includePrivate ? " (including private)" : " (public only)"
        }...`
      );

      // Fetch language data for each repository
      for (const repo of repos) {
        if (!repo.fork) {
          // Skip forked repositories
          try {
            const languages = await this.getRepositoryLanguages(
              repo.name,
              repo.owner.login
            );

            // Aggregate language bytes
            for (const [language, bytes] of Object.entries(languages)) {
              languageStats[language] = (languageStats[language] || 0) + bytes;
              totalBytes += bytes;
            }
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error);
          }
        }
      }

      // Convert to percentages and sort by usage
      const languagePercentages = Object.entries(languageStats)
        .map(([language, bytes]) => ({
          name: language,
          bytes: bytes,
          percentage: Math.round((bytes / totalBytes) * 100),
        }))
        .sort((a, b) => b.bytes - a.bytes);

      return languagePercentages;
    } catch (error) {
      console.error("Failed to fetch language stats:", error);
      return [];
    }
  }

  // Get repository count and other stats
  async getProfileStats(includePrivate = false) {
    try {
      const [profile, repos] = await Promise.all([
        this.getUserProfile(),
        this.getRepositories(100, includePrivate),
      ]);

      const publicRepos = repos.filter((repo) => !repo.fork);
      const totalStars = repos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
      );
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

      return {
        publicRepos: publicRepos.length,
        totalStars,
        totalForks,
        followers: profile.followers,
        following: profile.following,
        createdAt: profile.created_at,
      };
    } catch (error) {
      console.error("Failed to fetch profile stats:", error);
      return null;
    }
  }
}

// Language mapping for better display names and categories
export const LANGUAGE_CONFIG = {
  // Frontend
  JavaScript: {
    category: "Frontend",
    displayName: "JavaScript",
    color: "#f7df1e",
  },
  TypeScript: {
    category: "Frontend",
    displayName: "TypeScript",
    color: "#3178c6",
  },
  HTML: { category: "Frontend", displayName: "HTML", color: "#e34f26" },
  CSS: { category: "Frontend", displayName: "CSS", color: "#1572b6" },
  Vue: { category: "Frontend", displayName: "Vue.js", color: "#4fc08d" },
  React: { category: "Frontend", displayName: "React", color: "#61dafb" },
  Svelte: { category: "Frontend", displayName: "Svelte", color: "#ff3e00" },

  // Backend
  Python: { category: "Backend", displayName: "Python", color: "#3776ab" },
  Java: { category: "Backend", displayName: "Java", color: "#007396" },
  "C#": { category: "Backend", displayName: "C#", color: "#239120" },
  PHP: { category: "Backend", displayName: "PHP", color: "#777bb4" },
  Go: { category: "Backend", displayName: "Go", color: "#00add8" },
  Rust: { category: "Backend", displayName: "Rust", color: "#000000" },
  "C++": { category: "Backend", displayName: "C++", color: "#00599c" },
  C: { category: "Backend", displayName: "C", color: "#a8b9cc" },

  // Mobile
  Swift: { category: "Mobile", displayName: "Swift", color: "#fa7343" },
  Kotlin: { category: "Mobile", displayName: "Kotlin", color: "#7f52ff" },
  Dart: { category: "Mobile", displayName: "Flutter/Dart", color: "#0175c2" },

  // Data & Config
  Shell: { category: "Tools", displayName: "Shell/Bash", color: "#89e051" },
  PowerShell: {
    category: "Tools",
    displayName: "PowerShell",
    color: "#5391fe",
  },
  Dockerfile: { category: "Tools", displayName: "Docker", color: "#2496ed" },
  YAML: { category: "Tools", displayName: "YAML", color: "#cb171e" },
  JSON: { category: "Tools", displayName: "JSON", color: "#000000" },
  SQL: { category: "Database", displayName: "SQL", color: "#4479a1" },
  HCL: { category: "Tools", displayName: "Terraform", color: "#623ce4" },

  // Other
  "Jupyter Notebook": {
    category: "Data Science",
    displayName: "Jupyter Notebook",
    color: "#da5b0b",
  },
  R: { category: "Data Science", displayName: "R", color: "#276dc3" },
  MATLAB: { category: "Data Science", displayName: "MATLAB", color: "#0076a8" },
};
