import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import githubBlogService from "../../services/githubBlogService";

const BlogCreator = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "prismflow-development",
    tags: "",
    author: "Admin",
    coverImage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPreview, setShowPreview] = useState(false);
  const [configStatus, setConfigStatus] = useState({
    isValid: false,
    errors: [],
  });

  const categories = [
    { id: "prismflow-development", label: "PrismFlow Development" },
    { id: "woflie-bot-development", label: "Woflie Bot Development" },
    { id: "tailtales-development", label: "TailTales Development" },
  ];

  useEffect(() => {
    const status = githubBlogService.validateConfiguration();
    setConfigStatus(status);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const createMarkdownContent = () => {
    const date = new Date().toISOString().split("T")[0];
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    return `---
title: "${formData.title}"
date: "${date}"
excerpt: "${formData.excerpt}"
category: "${formData.category}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
author: "${formData.author}"
coverImage: "${formData.coverImage}"
---

${formData.content}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.excerpt) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!configStatus.isValid) {
      setMessage({
        type: "error",
        text: "GitHub configuration is invalid. Please check your environment variables.",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await githubBlogService.createBlogPost(formData);

      // Also try to update the BlogData.js file
      await githubBlogService.updateBlogData(formData);

      setMessage({
        type: "success",
        text: "Blog post created successfully! It will appear on your site after the next deployment.",
      });

      // Reset form
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "prismflow-development",
        tags: "",
        author: "Admin",
        coverImage: "",
      });

      if (onPostCreated) {
        onPostCreated(result);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreview = () => (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Preview</h3>
      <div className="prose max-w-none">
        <h1>{formData.title}</h1>
        <p className="text-gray-600 italic">{formData.excerpt}</p>
        <div className="whitespace-pre-wrap">{formData.content}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Icon icon="mdi:pencil-plus" className="text-3xl text-blue-500" />
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
      </div>

      {!configStatus.isValid && (
        <div className="p-4 rounded-lg mb-6 bg-red-100 text-red-800 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="mdi:alert-circle" className="text-lg" />
            <strong>Configuration Error</strong>
          </div>
          <ul className="list-disc list-inside text-sm space-y-1">
            {configStatus.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <p className="text-sm mt-2">
            Please set the required environment variables in your .env file.
          </p>
        </div>
      )}

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon={
                message.type === "success"
                  ? "mdi:check-circle"
                  : "mdi:alert-circle"
              }
              className="text-lg"
            />
            {message.text}
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`px-4 py-2 rounded-lg font-medium ${
            !showPreview
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Icon icon="mdi:pencil" className="inline mr-2" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`px-4 py-2 rounded-lg font-medium ${
            showPreview
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Icon icon="mdi:eye" className="inline mr-2" />
          Preview
        </button>
      </div>

      {showPreview ? (
        renderPreview()
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog post title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief description of the blog post"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="tag1, tag2, tag3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cover Image URL
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content * (Markdown supported)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here... You can use Markdown syntax."
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              You can use Markdown syntax for formatting (headers, links, code
              blocks, etc.)
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Icon icon="mdi:loading" className="animate-spin" />
                  Creating Post...
                </>
              ) : (
                <>
                  <Icon icon="mdi:publish" />
                  Publish Post
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 flex items-center gap-2"
            >
              <Icon icon="mdi:eye" />
              Preview
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogCreator;
