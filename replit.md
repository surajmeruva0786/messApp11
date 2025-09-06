# Replit.md

## Overview

A mobile-first food menu application built with React and Express. The app displays cafeteria or restaurant menus organized by days of the week and meal types (breakfast, lunch, dinner). Users can browse menu items, view detailed ingredient information, nutritional data, and dietary restrictions. The application features real-time meal period detection and an intuitive mobile interface with bottom navigation for date selection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling through shadcn/ui
- **Mobile-First Design**: Responsive layout optimized for mobile devices with fixed bottom navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for menu data retrieval
- **Development Server**: Custom Vite integration for hot module replacement in development
- **Request Logging**: Custom middleware for API request logging and performance monitoring

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database provider
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Data Structure**: JSON fields for complex data like ingredients and allergens arrays

### Component Architecture
- **Design System**: shadcn/ui components with Radix UI primitives
- **Custom Components**: 
  - FoodItemCard for menu item display
  - IngredientModal for detailed nutritional information
  - MealSelector for time-based meal navigation
  - BottomNavigation for date selection
- **Hooks**: Custom React hooks for meal timing logic and mobile detection
- **Time Management**: Real-time meal period detection with automatic UI updates

### External Dependencies

- **Database Provider**: Neon Database (PostgreSQL serverless)
- **UI Components**: Radix UI component primitives
- **Styling Framework**: Tailwind CSS
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Tools**: 
  - Replit integration for development environment
  - Vite plugins for enhanced development experience
  - TypeScript for type safety across the entire stack