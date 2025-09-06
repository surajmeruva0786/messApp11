# GitHub Pages Deployment Guide

## Quick Setup for GitHub Pages

1. **Fork or clone this repository** to your GitHub account

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set "Source" to "GitHub Actions"

3. **Deploy automatically**:
   - Push any changes to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at: `https://[username].github.io/[repository-name]/`

## Manual Build and Deploy

If you prefer to build and deploy manually:

```bash
# Generate menu data
npm run generate-data

# Build for production
npm run build

# The `dist` folder now contains your static site
# Upload the contents of `dist` to any static hosting service
```

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public` directory with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Enable "Enforce HTTPS" in repository settings

## File Structure for Deployment

The built application includes:
- `index.html` - Main application
- `assets/` - CSS and JavaScript bundles  
- `data/` - Static JSON menu files
- All files are optimized and ready for production

## Troubleshooting

**Build Fails**: Ensure all dependencies are installed with `npm install`

**Data Missing**: Run `npm run generate-data` before building

**Pages Not Loading**: Check that GitHub Pages source is set to "GitHub Actions"

**Menu Not Updating**: Regenerate data files and rebuild the application