# MessMenu - Ramanujan Mess Menu App

A mobile-first web application for displaying weekly mess hall menus. Built with React, TypeScript, and Tailwind CSS, optimized for GitHub Pages deployment.

## Features

- **Mobile-First Design**: Optimized for mobile devices with touch-friendly navigation
- **Weekly Menu Display**: Browse complete 7-day menu schedules with meal-wise categorization
- **Real-Time Meal Detection**: Automatically shows current meal based on time of day
- **Meal Type Navigation**: Switch between Breakfast, Lunch, Snacks, and Dinner
- **Dietary Information**: Clear indicators for vegetarian, vegan, and gluten-free options
- **Static Site**: No server required - works entirely with static JSON data files

## Meal Timings

### Weekdays (Monday - Friday)
- **Breakfast**: 8:00 AM - 9:30 AM
- **Lunch**: 12:30 PM - 2:00 PM
- **Snacks**: 5:30 PM - 6:30 PM
- **Dinner**: 8:00 PM - 9:30 PM

### Weekends (Saturday - Sunday)
- **Breakfast**: 8:30 AM - 10:30 AM
- **Lunch**: 1:00 PM - 3:00 PM
- **Snacks**: 5:30 PM - 6:30 PM
- **Dinner**: 8:00 PM - 9:30 PM

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for data fetching and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: GitHub Pages with automated deployment

## Local Development

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd MessMenu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate static menu data**
   ```bash
   npm run generate-data
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:5000 in your browser

## Building for Production

1. **Generate static data**
   ```bash
   npm run generate-data
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Preview the build**
   ```bash
   npm run preview
   ```

The built files will be in the `dist` directory, ready for deployment to GitHub Pages.

## GitHub Pages Deployment

This repository includes GitHub Actions workflow for automatic deployment:

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push changes** to the main branch
4. **Automatic deployment** will trigger and deploy to GitHub Pages

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your GitHub Pages or preferred hosting

## Project Structure

```
MessMenu/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and schemas
│   ├── pages/              # Page components
│   └── styles/             # CSS and styling
├── public/
│   └── data/               # Static JSON menu data
├── scripts/
│   └── extract-menu-data.js # Data generation script
└── .github/
    └── workflows/          # GitHub Actions
```

## Data Structure

Menu data is stored in static JSON files:
- Daily files: `monday.json`, `tuesday.json`, etc.
- Meal-specific files: `monday-breakfast.json`, `monday-lunch.json`, etc.

Each menu item includes:
- Basic information (name, description, category)
- Dietary indicators (vegetarian, vegan, gluten-free, spicy)
- Nutritional data (calories, protein)
- Meal type and day of week

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update menu data if needed by modifying `scripts/extract-menu-data.js`
5. Test your changes locally
6. Submit a pull request

## License

MIT License - see LICENSE file for details.