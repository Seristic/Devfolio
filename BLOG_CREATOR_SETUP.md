# Blog Creator Setup Guide

This guide will help you set up the blog post creator functionality for your DevFolio portfolio.

## Prerequisites

1. **GitHub Personal Access Token**: Required for creating blog posts via the GitHub API
2. **Environment Variables**: Proper configuration of your project settings

## Step 1: Create a GitHub Personal Access Token

1. Go to [GitHub Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "DevFolio Blog Creator"
4. Set expiration as needed (recommended: 90 days or longer)
5. Select the following scopes:
   - `repo` (Full control of private repositories) - or just `public_repo` if your repo is public
6. Click "Generate token"
7. **Copy the token immediately** (you won't be able to see it again)

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env` in your project root:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your actual values:
   ```bash
   REACT_APP_GITHUB_TOKEN=your_actual_github_token
   REACT_APP_GITHUB_USERNAME=your_github_username
   REACT_APP_GITHUB_REPO=Devfolio
   REACT_APP_ADMIN_PASSWORD=your_secure_admin_password
   ```

## Step 3: Restart Development Server

After setting up your environment variables, restart your development server:

```bash
npm start
```

## Step 4: Access the Blog Creator

1. Navigate to `/admin` in your browser (e.g., `http://localhost:3000/admin`)
2. Enter your admin password
3. Use the blog creator interface to write and publish posts

## How It Works

The blog creator:

1. **Creates markdown files** in `src/data/blog/posts/{category}/` directory
2. **Commits directly to GitHub** using the GitHub API
3. **Triggers automatic deployment** via GitHub Pages (if configured)
4. **Updates blog data** (attempts to update `BlogData.js` automatically)

## Blog Post Structure

Blog posts are created as markdown files with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-01"
excerpt: "Brief description"
category: "project-category"
tags: ["tag1", "tag2"]
author: "Admin"
coverImage: "https://example.com/image.jpg"
---

Your blog post content goes here...
```

## File Organization

```
src/data/blog/posts/
├── prismflow-development/
│   ├── post-1.md
│   └── post-2.md
├── wolfie-bot-development/
│   ├── post-1.md
│   └── post-2.md
└── tailtales-development/
    ├── post-1.md
    └── post-2.md
```

## Security Considerations

- **Never commit your `.env` file** to version control
- **Use a strong admin password**
- **Limit GitHub token permissions** to only what's needed
- **Consider IP restrictions** for production deployments
- **Use HTTPS** in production

## Troubleshooting

### "Configuration Error" Message

- Check that all environment variables are set in your `.env` file
- Ensure the GitHub token has proper permissions
- Verify your GitHub username and repository name are correct

### "GitHub API Error"

- Check that your GitHub token is valid and not expired
- Ensure the token has `repo` permissions
- Verify your repository name and username are correct

### Posts Not Appearing

- Check that the markdown files were created in the correct directory
- Ensure your GitHub Pages deployment is working
- Verify the blog data structure matches your blog system

## Adding Categories

To add new blog categories:

1. Update the `categories` array in `BlogCreator.js`
2. Create the corresponding directory in `src/data/blog/posts/`
3. Update your blog display components to handle the new category

## Production Deployment

For production:

1. Set environment variables in your hosting platform
2. Use a more secure authentication system
3. Consider rate limiting and additional security measures
4. Monitor GitHub API usage limits

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Test your GitHub token permissions manually
4. Ensure your repository structure matches the expected format
