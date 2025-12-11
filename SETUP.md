# 3A Transportation - Setup Guide

## Project Structure
```
3a/
├── src/                    # Web application (Next.js)
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   └── i18n/             # Internationalization
└── mobile/                # Mobile application (React Native + Expo)
    ├── src/              # Mobile source code
    └── app.json          # Expo configuration
```

## Prerequisites
- Node.js 18+ and npm/pnpm
- Git
- Expo CLI (for mobile): `npm install -g eas-cli`

## Web Application Setup

### 1. Install Dependencies
```bash
cd /path/to/3a
pnpm install
```

### 2. Environment Variables
Create `.env.local` in the root directory (optional - no API keys required):
```env
# No environment variables needed - using OpenStreetMap (free)
```

### 3. Run Development Server
```bash
pnpm dev
```
Access at: http://localhost:3000

### 4. Build for Production
```bash
pnpm build
pnpm start
```

## Mobile Application Setup

### 1. Navigate to Mobile Directory
```bash
cd mobile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
No API keys required! The app uses:
- **Maps**: Leaflet + OpenStreetMap (free, no API key)
- **Geocoding**: Nominatim (free, no API key)
- **Location**: expo-location (built-in)

### 4. Run on Expo Go
```bash
npx expo start
```
Scan QR code with Expo Go app

### 5. Build APK for Android
```bash
# Login to Expo (first time only)
eas login

# Build APK
eas build --platform android --profile preview
```

Build will be available at: https://expo.dev/accounts/ahmedgfathy80/projects/3a-transportation/builds

## Key Features

### Web Application
- ✅ Ride booking with map-based location selection
- ✅ Animated ride request view with captain tracking
- ✅ Leaflet maps with OpenStreetMap tiles
- ✅ Arabic/English bilingual support (Arabic default)
- ✅ Gold/Black premium theme

### Mobile Application
- ✅ Same features as web
- ✅ Native mobile experience
- ✅ Leaflet maps in WebView
- ✅ No Google Maps dependencies
- ✅ Location services with expo-location

## Technologies Used

### Web
- **Framework**: Next.js 15
- **Maps**: Leaflet 1.9.4 + react-leaflet
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Geocoding**: OpenStreetMap Nominatim

### Mobile
- **Framework**: React Native + Expo
- **Maps**: Leaflet 1.9.4 (via WebView)
- **Navigation**: React Navigation
- **Location**: expo-location
- **Geocoding**: OpenStreetMap Nominatim

## No API Keys Required! 🎉
This project uses completely free and open-source services:
- **OpenStreetMap** for map tiles
- **Nominatim** for geocoding/reverse geocoding
- **Leaflet** for map rendering

## Deployment

### Web (Vercel)
```bash
# Connect to Vercel
vercel

# Deploy
vercel --prod
```

### Mobile (Expo)
APK builds are handled by Expo Application Services (EAS).
Download from: https://expo.dev/accounts/ahmedgfathy80/projects/3a-transportation

## Troubleshooting

### Web: Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Mobile: Metro Bundler Issues
```bash
cd mobile
rm -rf node_modules
npm install
npx expo start --clear
```

### Build Errors
Ensure all dependencies are installed:
```bash
# Web
pnpm install

# Mobile
cd mobile
npm install
```

## Support
For issues, check the build logs:
- Web: Check terminal output
- Mobile: https://expo.dev/accounts/ahmedgfathy80/projects/3a-transportation/builds
