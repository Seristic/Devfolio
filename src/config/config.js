// Configuration file for GitHub integration
// Update this file with your personal information

export const CONFIG = {
  // GitHub Integration
  github: {
    username: "Seristic",
    token: process.env.REACT_APP_GITHUB_TOKEN || "", // Use environment variable for security
    enableIntegration: true,
    includePrivateRepos: true, // Set to true to include private repositories (requires token with 'repo' scope)
  },

  // Personal Information
  personal: {
    name: "Seristic",
    title: "Full Stack Developer",
    email: "alyssablackley@gmail.com",
    phone: "+44 7364 111484",
    location: "Barry, The Vale of Glamorgan, UK",

    // Social Links
    social: {
      github: "https://github.com/Seristic",
      linkedin: "https://linkedin.com/in/alyssa-blackley/",
      twitter: "https://x.com/MistySereen",
    },
  },

  // Skills Configuration (used when GitHub integration is disabled)
  skills: {
    // Minimum percentage to show a language from GitHub (default: 1%)
    minLanguagePercentage: 1,

    // Maximum number of languages to display (default: 12)
    maxLanguages: 12,

    // Use detailed language stats (slower but more accurate)
    useDetailedStats: false, // Set to true for more accurate language percentages

    // Manual skills (fallback when GitHub integration is disabled)
    manual: {
      frontend: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Tailwind CSS", level: 88 },
      ],
      backend: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "Express.js", level: 82 },
        { name: "MongoDB", level: 75 },
        { name: "PostgreSQL", level: 70 },
      ],
      tools: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 95 },
        { name: "VS Code", level: 95 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
      ],
    },
  },

  // Cache Configuration
  cache: {
    enabled: true,
    expiryHours: 2, // Cache expires after 2 hours (increased for better performance)
  },
};

// Helper function to get GitHub token from environment variables
export const getGitHubToken = () => {
  // In development, you can use environment variables
  return process.env.REACT_APP_GITHUB_TOKEN || CONFIG.github.token;
};

export default CONFIG;
