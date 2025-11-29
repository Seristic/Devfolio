import { useState, useEffect } from "react";
import { GitHubService, LANGUAGE_CONFIG } from "../services/githubService";

// Custom hook for GitHub data
export const useGitHubData = (username, options = {}) => {
  const [data, setData] = useState({
    languages: [],
    stats: null,
    loading: true,
    error: null,
  });

  const {
    token = null, // Optional GitHub token for higher rate limits
    minPercentage = 1, // Minimum percentage to include a language
    maxLanguages = 10, // Maximum number of languages to show
    enableCache = true, // Enable localStorage caching
    cacheExpiry = 3600000, // Cache expiry in milliseconds (1 hour)
    includePrivate = false, // Include private repositories (requires token with repo scope)
    useDetailedStats = false, // Use detailed language stats (slower but more accurate)
  } = options;

  useEffect(() => {
    if (!username) return;

    const fetchGitHubData = async () => {
      const cacheKey = `github-data-${username}${
        includePrivate ? "-private" : ""
      }`;

      // Check cache first
      if (enableCache) {
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const { data: cachedData, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < cacheExpiry) {
              setData({ ...cachedData, loading: false });
              return;
            }
          }
        } catch (error) {
          console.warn("Failed to load cached data:", error);
        }
      }

      setData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const github = new GitHubService(username, token);

        // Fetch language stats and profile stats in parallel
        const [languageStats, profileStats] = await Promise.all([
          useDetailedStats
            ? github.getAllLanguageStats(includePrivate)
            : github.getBasicLanguageStats(includePrivate),
          github.getProfileStats(includePrivate),
        ]);

        // Process and filter languages
        const processedLanguages = languageStats
          .filter((lang) => lang.percentage >= minPercentage)
          .slice(0, maxLanguages)
          .map((lang) => ({
            ...lang,
            config: LANGUAGE_CONFIG[lang.name] || {
              category: "Other",
              displayName: lang.name,
              color: "#6b7280",
            },
          }));

        const result = {
          languages: processedLanguages,
          stats: profileStats,
          loading: false,
          error: null,
        };

        setData(result);

        // Cache the result
        if (enableCache) {
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({
                data: { languages: processedLanguages, stats: profileStats },
                timestamp: Date.now(),
              })
            );
          } catch (error) {
            console.warn("Failed to cache data:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchGitHubData();
  }, [
    username,
    token,
    minPercentage,
    maxLanguages,
    enableCache,
    cacheExpiry,
    includePrivate,
    useDetailedStats,
  ]);

  return data;
};

// Helper function to group languages by category
export const groupLanguagesByCategory = (languages) => {
  const grouped = languages.reduce((acc, lang) => {
    const category = lang.config.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(lang);
    return acc;
  }, {});

  // Sort categories by total usage
  const sortedCategories = Object.entries(grouped)
    .map(([category, langs]) => ({
      category,
      languages: langs.sort((a, b) => b.percentage - a.percentage),
      totalPercentage: langs.reduce((sum, lang) => sum + lang.percentage, 0),
    }))
    .sort((a, b) => b.totalPercentage - a.totalPercentage);

  return sortedCategories;
};

// Helper function to convert GitHub language percentages to skill levels (0-100)
export const convertToSkillLevel = (percentage, totalLanguages) => {
  // This is a simple conversion - you can adjust the formula as needed
  // Higher percentage = higher skill level, but also consider total languages
  const baseLevel = Math.min(percentage * 2, 90); // Cap at 90% for very high usage
  const experienceBonus = Math.min(totalLanguages * 2, 10); // Bonus for variety
  return Math.min(baseLevel + experienceBonus, 95); // Cap at 95%
};
