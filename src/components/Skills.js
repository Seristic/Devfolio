import React, { useState } from "react";
import {
  useGitHubData,
  groupLanguagesByCategory,
  convertToSkillLevel,
} from "../hooks/useGitHubData";
import CONFIG from "../config/config";

const Skills = () => {
  const [showGitHubSkills, setShowGitHubSkills] = useState(
    CONFIG.github.enableIntegration
  );

  // GitHub data hook
  const { languages, stats, loading, error } = useGitHubData(
    showGitHubSkills ? CONFIG.github.username : null,
    {
      token: CONFIG.github.token,
      minPercentage: CONFIG.skills.minLanguagePercentage,
      maxLanguages: CONFIG.skills.maxLanguages,
      enableCache: CONFIG.cache.enabled,
      cacheExpiry: CONFIG.cache.expiryHours * 60 * 60 * 1000,
      includePrivate: CONFIG.github.includePrivateRepos,
      useDetailedStats: CONFIG.skills.useDetailedStats,
    }
  );

  // Static fallback skills from config
  const staticSkillCategories = [
    {
      title: "Frontend",
      skills: CONFIG.skills.manual.frontend,
    },
    {
      title: "Backend",
      skills: CONFIG.skills.manual.backend,
    },
    {
      title: "Tools & Others",
      skills: CONFIG.skills.manual.tools,
    },
  ];

  // Convert GitHub data to skill categories
  const getGitHubSkillCategories = () => {
    if (!languages.length) return [];

    const groupedLanguages = groupLanguagesByCategory(languages);

    return groupedLanguages.map(
      ({ category, languages: categoryLanguages }) => ({
        title: category,
        skills: categoryLanguages.map((lang) => ({
          name: lang.config.displayName,
          level: convertToSkillLevel(lang.percentage, languages.length),
          percentage: lang.percentage,
          bytes: lang.bytes,
          color: lang.config.color,
        })),
      })
    );
  };

  const skillCategories = showGitHubSkills
    ? getGitHubSkillCategories()
    : staticSkillCategories;

  const SkillBar = ({ skill, isGitHubData = false }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          {isGitHubData && skill.color && (
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: skill.color }}
            ></div>
          )}
          {skill.name}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{skill.level}%</span>
          {isGitHubData && skill.percentage && (
            <span className="text-xs text-gray-400">
              ({skill.percentage}% usage)
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
            isGitHubData
              ? "bg-gray-600"
              : "bg-gradient-to-r from-primary-600 to-purple-600"
          }`}
          style={{
            width: `${skill.level}%`,
            backgroundColor:
              isGitHubData && skill.color ? skill.color : undefined,
          }}
        ></div>
      </div>
    </div>
  );

  const GitHubStatsCard = ({ stats }) => (
    <div className="card p-6 col-span-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        GitHub Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {stats.publicRepos}
          </div>
          <div className="text-xs text-gray-600">Public Repos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {stats.totalStars}
          </div>
          <div className="text-xs text-gray-600">Total Stars</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {stats.followers}
          </div>
          <div className="text-xs text-gray-600">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {Math.floor(
              (Date.now() - new Date(stats.createdAt)) /
                (365.25 * 24 * 60 * 60 * 1000)
            )}
          </div>
          <div className="text-xs text-gray-600">Years on GitHub</div>
        </div>
      </div>
    </div>
  );

  const LoadingCard = () => (
    <div className="card p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {showGitHubSkills
              ? "Skills automatically generated from my GitHub repository languages and usage statistics."
              : "I'm constantly learning and improving my skills to stay up-to-date with the latest technologies and best practices."}
          </p>

          {/* Toggle GitHub Integration */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className="text-sm text-gray-600">Manual Skills</span>
            <button
              onClick={() => setShowGitHubSkills(!showGitHubSkills)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showGitHubSkills ? "bg-primary-600" : "bg-gray-300"
              }`}
              disabled={!CONFIG.github.enableIntegration}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showGitHubSkills ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-600">
              GitHub Data
              {!CONFIG.github.enableIntegration && (
                <span className="text-red-500 ml-1">(Disabled)</span>
              )}
            </span>
          </div>

          {showGitHubSkills && error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">
                <strong>Error loading GitHub data:</strong> {error}
              </p>
              <p className="text-red-600 text-xs mt-1">
                Falling back to manual skills. Check your GitHub username and
                internet connection.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* GitHub Stats Card */}
          {showGitHubSkills && stats && !loading && (
            <GitHubStatsCard stats={stats} />
          )}

          {/* Skills Categories */}
          {loading && showGitHubSkills
            ? // Loading cards
              [...Array(3)].map((_, index) => <LoadingCard key={index} />)
            : // Actual skills
              skillCategories.map((category, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center flex items-center justify-center">
                    {category.title}
                    {showGitHubSkills && (
                      <svg
                        className="w-4 h-4 ml-2 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </h3>
                  <div>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skillIndex}
                        skill={skill}
                        isGitHubData={showGitHubSkills}
                      />
                    ))}
                  </div>
                </div>
              ))}
        </div>

        {/* Technologies Icons */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Show either GitHub languages or static tech list */}
            {(showGitHubSkills && languages.length > 0
              ? languages.slice(0, 10).map((lang) => lang.config.displayName)
              : [
                  "React",
                  "JavaScript",
                  "Node.js",
                  "Python",
                  "TypeScript",
                  "Docker",
                  "AWS",
                  "MongoDB",
                  "PostgreSQL",
                  "Git",
                ]
            ).map((tech, index) => (
              <div
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                {tech}
              </div>
            ))}
          </div>

          {showGitHubSkills && (
            <p className="text-center text-xs text-gray-500 mt-4">
              Data automatically synced from GitHub repositories
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
