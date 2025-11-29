const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const REPO_OWNER = process.env.REACT_APP_GITHUB_USERNAME || "your-username";
const REPO_NAME = process.env.REACT_APP_GITHUB_REPO || "Devfolio";

const BASE_URL = "https://api.github.com";

class GitHubService {
  constructor() {
    this.headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };
  }

  async createBlogPost(postData) {
    const { title, category, content } = postData;
    const slug = this.generateSlug(title);
    const fileName = `${slug}.md`;
    const filePath = `src/data/blog/posts/${category}/${fileName}`;

    // Check if file already exists
    let sha = null;
    try {
      const existingFile = await this.getFile(filePath);
      sha = existingFile.sha;
    } catch (error) {
      // File doesn't exist, which is fine for new posts
    }

    const markdownContent = this.createMarkdownContent(postData);

    return this.createOrUpdateFile(
      filePath,
      markdownContent,
      `Add blog post: ${title}`,
      sha
    );
  }

  async getFile(filePath) {
    const response = await fetch(
      `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      { headers: this.headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`);
    }

    return response.json();
  }

  async createOrUpdateFile(filePath, content, message, sha = null) {
    const body = {
      message,
      content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
      ...(sha && { sha }),
    };

    const response = await fetch(
      `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    return response.json();
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  createMarkdownContent(postData) {
    const date = new Date().toISOString().split("T")[0];
    const tags = postData.tags
      ? postData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    return `---
title: "${postData.title}"
date: "${date}"
excerpt: "${postData.excerpt}"
category: "${postData.category}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
author: "${postData.author}"
coverImage: "${postData.coverImage}"
---

${postData.content}`;
  }

  async updateBlogData(newPost) {
    const blogDataPath = "src/data/blog/BlogData.js";

    try {
      // Get current blog data file
      const currentFile = await this.getFile(blogDataPath);
      const currentContent = atob(currentFile.content);

      // Parse and update the content (this is a simplified approach)
      // In a real implementation, you'd want to properly parse the JS file
      const postEntry = {
        id: this.generateSlug(newPost.title),
        title: newPost.title,
        excerpt: newPost.excerpt,
        date: new Date().toISOString().split("T")[0],
        category: newPost.category,
        tags: newPost.tags
          ? newPost.tags.split(",").map((tag) => tag.trim())
          : [],
        author: newPost.author,
        coverImage: newPost.coverImage,
        slug: this.generateSlug(newPost.title),
      };

      // This is a simplified approach - in production you'd want better parsing
      const updatedContent = this.updateBlogDataContent(
        currentContent,
        postEntry
      );

      return this.createOrUpdateFile(
        blogDataPath,
        updatedContent,
        `Update blog data with new post: ${newPost.title}`,
        currentFile.sha
      );
    } catch (error) {
      console.warn(
        "Could not update BlogData.js automatically:",
        error.message
      );
      return null;
    }
  }

  updateBlogDataContent(content, newPost) {
    // This is a simplified implementation
    // In production, you'd want to properly parse and modify the JavaScript file
    const postString = `    {
      id: "${newPost.id}",
      title: "${newPost.title}",
      excerpt: "${newPost.excerpt}",
      date: "${newPost.date}",
      category: "${newPost.category}",
      tags: [${newPost.tags.map((tag) => `"${tag}"`).join(", ")}],
      author: "${newPost.author}",
      coverImage: "${newPost.coverImage}",
      slug: "${newPost.slug}"
    },`;

    // Find the posts array and add the new post
    const postsArrayMatch = content.match(
      /(const\s+posts\s*=\s*\[)([\s\S]*?)(\];)/
    );
    if (postsArrayMatch) {
      const beforeArray = content.substring(
        0,
        postsArrayMatch.index + postsArrayMatch[1].length
      );
      const afterArray = content.substring(
        postsArrayMatch.index + postsArrayMatch[0].length
      );
      const existingPosts = postsArrayMatch[2];

      return (
        beforeArray +
        "\n" +
        postString +
        existingPosts +
        postsArrayMatch[3] +
        afterArray
      );
    }

    return content;
  }

  validateConfiguration() {
    const errors = [];

    if (!GITHUB_TOKEN) {
      errors.push("REACT_APP_GITHUB_TOKEN is not set");
    }

    if (!REPO_OWNER || REPO_OWNER === "your-username") {
      errors.push(
        "REACT_APP_GITHUB_USERNAME is not set or still using default value"
      );
    }

    if (!REPO_NAME || REPO_NAME === "Devfolio") {
      errors.push("REACT_APP_GITHUB_REPO is not set or using default value");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export default new GitHubService();
