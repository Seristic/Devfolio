# DevFolio - Modern Developer Portfolio

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Seristic/Seristic.github.io/releases)
[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-green.svg)](https://Seristic.github.io)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-blue.svg)](https://tailwindcss.com/)

A modern, responsive developer portfolio website built with React and Tailwind CSS. Features dynamic GitHub integration, smooth animations, and a professional design.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **GitHub Integration**: Automatically sync skills and projects from GitHub
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Fast Performance**: Optimized build with React 18
- **SEO Friendly**: Proper meta tags and structure
- **GitHub Pages Ready**: Pre-configured for easy deployment

## 🔗 Live Demo

Visit the live website: [https://Seristic.github.io](https://Seristic.github.io)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Seristic/Seristic.github.io.git
cd Seristic.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

### Personal Information

Edit `src/config/config.js` to customize your portfolio:

```javascript
export const CONFIG = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... more settings
  },
  // ... other configurations
};
```

### GitHub Integration

For dynamic skills and projects, see [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed setup instructions.

### Environment Variables

Copy `.env.example` to `.env` and add your GitHub token:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
REACT_APP_GITHUB_TOKEN=your_github_token_here
```

## 🏗️ Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 📦 Deployment

The project is configured for GitHub Pages deployment. The build files are automatically copied to the repository root for direct serving.

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings
2. Set source to "Deploy from a branch"
3. Select "main" branch and "/ (root)" folder
4. Your site will be available at `https://yourusername.github.io`

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [GitHub API](https://docs.github.com/en/rest) - Dynamic data integration
- [GitHub Pages](https://pages.github.com/) - Hosting platform

## 📁 Project Structure

```
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   ├── config/         # Configuration files
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   └── ...
├── build/              # Production build (auto-generated)
├── static/             # Built static assets
├── .env.example        # Environment variables template
├── .nojekyll          # GitHub Pages configuration
└── ...
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Customize colors and styles in:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles

### Components

All components are in `src/components/`:

- `Hero.js` - Landing section
- `About.js` - About me section
- `Skills.js` - Skills showcase
- `Projects.js` - Projects portfolio
- `Contact.js` - Contact information
- `Footer.js` - Footer section

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have any questions or issues, please [open an issue](https://github.com/Seristic/Seristic.github.io/issues) on GitHub.

---

⭐ **If you found this project helpful, please give it a star!** ⭐
