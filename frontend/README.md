# EventManager Frontend

A modern event management frontend built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Powered by Next.js 15 with App Router
- 🎯 **Type Safety**: Full TypeScript support
- 🧭 **Navigation**: Clean topbar navigation with dropdown menus

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React (via shadcn/ui)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with topbar
│   └── page.tsx           # Home page with event creation form
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── topbar.tsx        # Navigation topbar
└── lib/                  # Utility functions
    └── utils.ts          # shadcn/ui utilities
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend is designed to work with the FastAPI backend. Make sure your backend is running on `http://localhost:8000` for the event creation form to work properly.

## Components

### Topbar
- App branding
- Navigation menu with Events dropdown
- Quick action buttons (Sign In/Sign Up)

### Home Page
- Event creation form
- Quick actions sidebar
- Recent events display

## Styling

The app uses Tailwind CSS with a custom design system provided by shadcn/ui. The color scheme and components are fully customizable through the `globals.css` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the EventManager application.