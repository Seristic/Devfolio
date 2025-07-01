// Configuration file for GitHub integration
// Update this file with your personal information

export const CONFIG = {
  // GitHub Integration
  github: {
    username: "Seristic",
    token: "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",
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
    // Minimum percentage to show a language from GitHub (default: 2%)
    minLanguagePercentage: 2,

    // Maximum number of languages to display (default: 15)
    maxLanguages: 15,

    // Manual skills (fallback when GitHub integration is disabled)
    manual: {
      frontend: [],
      backend: [],
      tools: [],
    },
  },

  // Cache Configuration
  cache: {
    enabled: true,
    expiryHours: 1, // Cache expires after 1 hour
  },
};

// Helper function to get GitHub token from environment variables
export const getGitHubToken = () => {
  // In development, you can use environment variables
  return process.env.REACT_APP_GITHUB_TOKEN || CONFIG.github.token;
};

export default CONFIG;
