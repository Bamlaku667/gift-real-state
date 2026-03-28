# Gift Real Estate Ethiopia

A modern, responsive marketing website for Gift Real Estate Ethiopia, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern UI**: Clean, premium design with smooth animations and micro-interactions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **SEO Optimized**: Proper metadata, Open Graph tags, and semantic HTML.
- **Performance**: Fast loading times with optimized images and code splitting.
- **Accessibility**: ARIA labels, keyboard navigation, and focus management.
- **Components**:
  - **Header**: Sticky navigation with responsive dropdown and CTA.
  - **Footer**: Comprehensive footer with sitemap, contact info, and social links.
  - **Hero Section**: Engaging hero with dynamic background and CTA.
  - **Project Cards**: Interactive cards with hover effects and quick actions.
  - **Chatbot**: Floating AI chatbot for instant customer support.
  - **Announcement Banner**: Sticky banner for important announcements.
  - **Toaster**: Toast notifications for user feedback.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Analytics**: Google Analytics (GA4)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gift-real-state
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Configuration

Create a `.env.local` file in the root directory:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Run Production

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
gift-real-state/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (marketing)/      # Marketing pages
│   │   ├── api/              # API routes
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   │   ├── layouts/          # Header, Footer
│   │   ├── ui/               # UI primitives
│   │   ├── chatbot/          # Chatbot components
│   │   └── projects/         # Project-specific components
│   ├── lib/                  # Utility functions
│   ├── constants/            # Constants and types
│   └── styles/               # Global styles
├── public/                   # Static assets
└── .env.local                # Environment variables
```

## Components Reference

### Layout Components

- **Header**: Sticky navigation with responsive dropdown and CTA.
- **Footer**: Comprehensive footer with sitemap, contact info, and social links.

### Feature Components

- **Hero**: Engaging hero with dynamic background and CTA.
- **Project Cards**: Interactive cards with hover effects and quick actions.
- **Chatbot**: Floating AI chatbot for instant customer support.
- **Announcement Banner**: Sticky banner for important announcements.
- **Toaster**: Toast notifications for user feedback.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint code |
| `npm run format` | Format code |

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ for Gift Real Estate Ethiopia**
