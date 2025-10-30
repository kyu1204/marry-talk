# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered Korean wedding planning application ("AI 웨딩 플래너") built with Next.js 16 and React 19. The app helps Korean couples prepare for their wedding by providing AI chat assistance, vendor recommendations, task management, and budget planning.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4.1.9 with shadcn/ui components
- **AI Integration**: Vercel AI SDK (`ai` package v5.0.81) with OpenAI GPT-5-mini model
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives with custom shadcn/ui components

### Project Structure

**App Routes (Next.js App Router)**:
- `/` - Main chat interface (chat-interface-main component)
- `/dashboard` - Main dashboard
- `/dashboard/chat` - AI chat interface
- `/dashboard/tasks` - Task management
- `/dashboard/vendors` - Vendor browsing
- `/budget` - Budget planning
- `/setup` - Initial wedding setup/onboarding
- `/tasks` - Task list view
- `/vendors` - Vendor search and listing

**API Routes**:
- `/api/chat` - AI chat endpoint using Vercel AI SDK's `streamText`
- `/api/vendors` - AI-powered vendor recommendations using `generateObject`

**Components**:
- `components/ui/` - shadcn/ui components (button, card, input, select, etc.)
- `components/bottom-tab-bar.tsx` - Mobile navigation
- `components/chat-interface*.tsx` - Chat UI components
- `components/task-list.tsx` - Task management UI
- `components/vendor-*.tsx` - Vendor search and display components
- `components/wedding-onboarding.tsx` - Initial setup flow

**Configuration**:
- Path alias: `@/*` maps to project root
- shadcn/ui style: "new-york"
- Icon library: lucide-react
- Language: Korean (lang="ko")

### AI Integration

The app uses Vercel AI SDK with OpenAI's GPT-5-mini model:

1. **Chat API** (`/api/chat/route.ts`):
   - Uses `streamText` for streaming responses
   - System prompt defines AI as a Korean wedding planner assistant
   - Max duration: 30 seconds
   - Temperature: 0.7
   - Max tokens: 2000

2. **Vendor Recommendations** (`/api/vendors/route.ts`):
   - Uses `generateObject` with Zod schema validation
   - Returns structured vendor data (name, category, description, price range, features, recommendations)
   - Generates 5 vendor recommendations per request

### TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Path aliases configured (`@/*`)
- Module resolution: bundler

### Styling

- Tailwind CSS 4.1.9 with Tailwind CSS v4 PostCSS plugin
- CSS file: `app/globals.css`
- Base color: neutral
- CSS variables enabled
- No prefix for utility classes
- Tailwind animate CSS enabled

## Development Notes

- The app is in Korean and targets Korean wedding culture and traditions
- Mobile-first design with bottom tab navigation
- Uses server components where possible (Next.js App Router)
- AI responses are streamed for better UX
- Form validation uses Zod schemas
- 항상 serena mcp를 사용할 수 있다면 최우선으로 사용