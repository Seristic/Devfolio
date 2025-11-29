import React, { useState } from "react";
import { Icon } from "@iconify/react";
import BlogCreator from "./BlogCreator";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("blog-creator");

  // Simple password protection - in production, use proper authentication
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const tabs = [
    { id: "blog-creator", label: "Create Blog Post", icon: "mdi:pencil-plus" },
    { id: "settings", label: "Settings", icon: "mdi:cog" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Icon
              icon="mdi:shield-lock"
              className="mx-auto text-6xl text-blue-500"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the admin password to access the dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Admin password"
                required
              />
            </div>

            {authError && (
              <div className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                <Icon icon="mdi:alert-circle" />
                {authError}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Icon icon="mdi:login" className="mr-2" />
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Icon
                icon="mdi:view-dashboard"
                className="text-2xl text-blue-500 mr-3"
              />
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon icon={tab.icon} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Icon icon="mdi:logout" className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === "blog-creator" && (
          <BlogCreator
            onPostCreated={(result) => {
              console.log("Post created:", result);
              // Could add a toast notification here
            }}
          />
        )}

        {activeTab === "settings" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">
                  Environment Variables
                </h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    <strong>REACT_APP_GITHUB_TOKEN:</strong>{" "}
                    {process.env.REACT_APP_GITHUB_TOKEN ? "✓ Set" : "✗ Not set"}
                  </p>
                  <p>
                    <strong>REACT_APP_ADMIN_PASSWORD:</strong>{" "}
                    {process.env.REACT_APP_ADMIN_PASSWORD
                      ? "✓ Set"
                      : "✗ Using default"}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">
                  Security Notes
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Change the default admin password in production</li>
                  <li>
                    • Ensure your GitHub token has only necessary permissions
                  </li>
                  <li>
                    • Consider implementing proper authentication for public
                    sites
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
