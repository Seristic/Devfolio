# DevFolio - React Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and CSS3. Features a clean design with smooth animations and interactive components.

## Features

- 🎨 **Modern Design** - Clean, professional layout with beautiful gradients and animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Fast Performance** - Built with React for optimal performance
- 🎯 **Interactive Components** - Smooth scrolling, hover effects, and dynamic content
- 🌈 **Customizable** - Easy to customize colors, content, and styling
- 📧 **Contact Form** - Functional contact form with form validation
- 🔧 **Skills Showcase** - Interactive skill bars and technology displays
- 🚀 **Project Portfolio** - Filterable project gallery with detailed information

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Icons**: Heroicons (SVG icons)
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd devfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Customization

### Personal Information

Update the following files to customize the website with your information:

1. **src/components/Hero.js** - Update name, title, and description
2. **src/components/About.js** - Add your bio, stats, and profile image
3. **src/components/Skills.js** - Update your skills and proficiency levels
4. **src/components/Projects.js** - Add your projects with descriptions and links
5. **src/components/Contact.js** - Update contact information and social links

### Styling

The website uses Tailwind CSS for styling. You can customize:

- **Colors**: Update the color palette in `tailwind.config.js`
- **Fonts**: Change fonts in `tailwind.config.js` and `public/index.html`
- **Animations**: Modify animations in `src/index.css`

### Components Structure

```
src/
├── components/
│   ├── Header.js      # Navigation bar
│   ├── Hero.js        # Landing section
│   ├── About.js       # About section
│   ├── Skills.js      # Skills section
│   ├── Projects.js    # Projects portfolio
│   ├── Contact.js     # Contact form
│   └── Footer.js      # Footer section
├── App.js             # Main app component
├── index.js           # Entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you found this project helpful, please give it a ⭐️!

For questions or support, feel free to reach out through the contact form or social media links.

---

Built with ❤️ by [Your Name]
