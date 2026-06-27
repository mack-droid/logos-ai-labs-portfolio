<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Logos AI Labs Portfolio

A modern, AI-powered portfolio website built with React, Vite, and Google's Gemini AI. This project showcases AI integration capabilities and provides a professional portfolio experience.

View your app in AI Studio: https://ai.studio/apps/68455196-a3cb-4adb-b83f-ca2406a05494

## 🚀 Features

- **Modern React App**: Built with React 19 and Vite for fast development
- **AI Integration**: Powered by Google Gemini AI for intelligent features
- **Tailwind CSS**: Beautiful, responsive styling with Tailwind CSS v4
- **TypeScript**: Type-safe development with TypeScript
- **CI/CD Pipeline**: Automated testing and deployment via GitHub Actions
- **Responsive Design**: Optimized for all screen sizes

## 📋 Prerequisites

- Node.js (v24 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/logos-aboutme-portfolio.git
   cd logos-aboutme-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Running Locally

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Build for Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for automated CI/CD:

- **On Push**: Runs linting, builds the application
- **On Pull Request**: Validates changes before merging
- **On Main Branch**: Automatically deploys to Cloudflare Pages

### Setting up GitHub Actions for Cloudflare Pages

1. Create a Cloudflare Pages project at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Get your Cloudflare API Token and Account ID
3. Add the following to GitHub Secrets (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
4. Update the workflow file with your Cloudflare Pages project name
5. Push to the main branch to trigger automatic deployment

## 🧪 Testing

Run the linter to check for code issues:
```bash
npm run lint
```

## 📁 Project Structure

```
logos-aboutme-portfolio/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── src/
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   └── types.ts               # TypeScript type definitions
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is unlicensed. All rights reserved.

## 🔗 Links

- [Google AI Studio](https://ai.studio/apps/68455196-a3cb-4adb-b83f-ca2406a05494)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
