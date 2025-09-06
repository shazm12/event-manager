# EventManager Frontend

Next.js frontend for the Event Management application.

> **Note**: For general project information and Docker setup, see the main [README.md](../README.md)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── events/         # Event pages
│   ├── actions/        # Server actions
│   └── types.ts        # TypeScript types
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── topbar.tsx     # Navigation
└── lib/               # Utilities
```

## Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Integration

Requires backend running on `http://localhost:8000`