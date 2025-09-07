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
│   ├── topbar.tsx     # Navigation
│   └── timezone-indicator.tsx # Timezone display
├── lib/               # Utilities
│   ├── timezone.ts    # Timezone conversion utilities
└── README.md          # This file
```

## Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Integration

Requires backend running on `http://localhost:8000`

## Timezone Handling

The frontend automatically converts all UTC times from the API to the user's local timezone for display. See [TIMEZONE.md](TIMEZONE.md) for detailed information.

### Key Features:
- **Automatic Conversion**: UTC times are converted to local timezone
- **Timezone Indicators**: Shows users what timezone they're viewing
- **Event Status**: Calculated based on local time
- **Consistent Display**: All times shown in user's local timezone