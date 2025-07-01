# 🚀 GitHub Skills Integration Setup Guide

## Overview

Your Skills section can now automatically sync with your GitHub repositories to display your actual programming language usage! This creates a more accurate and dynamic representation of your technical skills.

## 🔧 Quick Setup

### Step 1: Update Configuration

Edit `src/config/config.js` and update these settings:

```javascript
export const CONFIG = {
  github: {
    username: "your-actual-github-username", // 🔥 Required!
    token: null, // Optional - see Step 3 for higher rate limits
    enableIntegration: true, // 🔥 Set to true to enable
  },
  // ... rest of config
};
```

### Step 2: Test the Integration

1. Save the config file
2. Reload your website
3. Navigate to the Skills section
4. Toggle the "GitHub Data" switch
5. You should see your skills populate automatically!

### Step 3: Optional - GitHub Token (Recommended)

For better performance and higher rate limits:

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio Website"
4. **Don't select any scopes** (public data only)
5. Copy the token
6. Add it to your config:
   ```javascript
   github: {
     username: 'your-username',
     token: 'ghp_your_token_here', // Add your token
     enableIntegration: true,
   }
   ```

## 🎨 Features

### What it does:

- ✅ Fetches all your public repositories
- ✅ Analyzes language usage across repos
- ✅ Groups languages by category (Frontend, Backend, etc.)
- ✅ Shows usage percentages and skill levels
- ✅ Displays GitHub statistics (repos, stars, followers)
- ✅ Caches data for better performance
- ✅ Falls back to manual skills if GitHub fails

### What it shows:

- **Language Usage**: Percentage of code written in each language
- **Skill Levels**: Calculated based on usage and experience
- **Color Coding**: Each language has its official color
- **GitHub Stats**: Repository count, stars, followers, years on GitHub

## 🛠 Customization

### Language Categories

Languages are automatically categorized:

- **Frontend**: JavaScript, TypeScript, HTML, CSS, React, Vue, etc.
- **Backend**: Python, Java, C#, Node.js, Go, etc.
- **Mobile**: Swift, Kotlin, Dart, etc.
- **Tools**: Shell, Docker, YAML, etc.

### Skill Level Calculation

The system converts GitHub usage percentages to skill levels (0-100%):

- Higher usage percentage = higher skill level
- Bonus points for working with multiple languages
- Capped at 95% to show room for growth

### Filtering Options

In your config, you can adjust:

```javascript
skills: {
  minLanguagePercentage: 2, // Only show languages with 2%+ usage
  maxLanguages: 15, // Maximum languages to display
}
```

## 🔍 Troubleshooting

### "Error loading GitHub data"

1. **Check username**: Make sure it's exactly your GitHub username
2. **Check internet**: Ensure you have an internet connection
3. **Rate limits**: Add a GitHub token (see Step 3)
4. **CORS issues**: This shouldn't happen with GitHub's API

### Skills not updating

1. **Clear cache**: The data is cached for 1 hour
2. **Force refresh**: Clear your browser cache
3. **Check repositories**: Make sure you have public repositories

### Toggle is disabled

1. **Check config**: Ensure `enableIntegration: true` in config
2. **Check username**: Must have a valid GitHub username set

## 🚀 Advanced Usage

### Environment Variables

For security, you can use environment variables instead of hardcoding tokens:

1. Create `.env` file in your project root:

   ```
   REACT_APP_GITHUB_TOKEN=ghp_your_token_here
   ```

2. The app will automatically use this token

### Custom Language Mapping

Edit `src/services/githubService.js` to add new languages or change categories:

```javascript
export const LANGUAGE_CONFIG = {
  YourLanguage: {
    category: "Backend",
    displayName: "Your Language",
    color: "#ff6b6b",
  },
  // ... existing mappings
};
```

## 📊 Example Output

With GitHub integration enabled, your skills section will show:

```
Frontend (45% of total code)
├── JavaScript - 95% (23% usage)
├── TypeScript - 87% (15% usage)
└── CSS - 82% (7% usage)

Backend (35% of total code)
├── Python - 90% (20% usage)
├── Node.js - 85% (15% usage)

Tools (20% of total code)
├── Shell - 75% (12% usage)
├── Docker - 70% (8% usage)
```

Plus GitHub stats like repositories, stars, and years of experience!

## 🎯 Tips

1. **Keep repos public**: Private repos won't be counted
2. **Use meaningful commits**: The data reflects your actual coding
3. **Regular commits**: More recent activity is better
4. **Diverse projects**: Shows breadth of skills
5. **Clean up old repos**: Fork/delete repos you don't want counted

---

**Need help?** The system automatically falls back to manual skills if GitHub integration fails, so your site will always work!
