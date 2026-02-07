# Flashboard Help Center

A modern, MDX-powered help center and documentation platform for Flashboard keyboard application, built with Next.js 16 and TypeScript.

## Overview

This help center provides comprehensive documentation covering installation, features, customization, creative tools, troubleshooting, and privacy information for Flashboard users. Content is written in MDX format, enabling rich interactive components within documentation articles.

## Features

- **MDX-based Content**: Write documentation with React components embedded in Markdown
- **Full-text Search**: Powered by Fuse.js for fast client-side search
- **Interactive Components**: Custom accordions, tabs, and other MDX components
- **Responsive Design**: Built with Tailwind CSS for optimal viewing on all devices
- **Type-safe**: Full TypeScript support throughout the codebase
- **Category Organization**: Content organized by setup, features, customization, and more

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with Typography plugin
- **Content**: MDX (next-mdx-remote)
- **Search**: Fuse.js
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, gray-matter

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically reload when you make changes to the code.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Content Structure

Documentation articles are stored in the `content/` directory, organized by category:

```
content/
├── setup/              # Installation and initial setup guides
├── features/           # Feature documentation
├── customization/      # Themes, fonts, and appearance
├── creative-tools/     # Flash Arts and creative features
├── troubleshooting/    # FAQ and common issues
└── privacy/            # Data safety and privacy information
```

### Adding New Articles

1. Create a new `.mdx` file in the appropriate category folder
2. Use the `ARTICLE_TEMPLATE.mdx` as a starting point
3. Include frontmatter with title, description, and category
4. Write content using MDX syntax with custom components as needed

## Custom MDX Components

- **Accordion**: Collapsible sections for FAQ-style content
- **Tabs**: Tabbed content for multiple related sections
- Additional components can be added in `src/components/mdx/`

## Project Structure

```
├── content/            # MDX documentation files
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   │   ├── home/       # Homepage components
│   │   ├── layout/     # Layout components
│   │   ├── mdx/        # Custom MDX components
│   │   └── search/     # Search functionality
│   └── lib/            # Utility functions and content helpers
└── ...config files

```

## Deployment

This application can be deployed to any platform that supports Next.js:

- **Vercel**: Native Next.js deployment platform
- **Netlify**: Supports Next.js with automatic builds
- **AWS Amplify**: Full-stack deployment option
- **Self-hosted**: Deploy using Node.js or Docker

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed platform-specific instructions.
