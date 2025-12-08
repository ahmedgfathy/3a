# Quick Start Guide - 3a Transportation Mobile App

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   ```

2. **npm** or **yarn**
   ```bash
   npm --version
   ```

3. **Expo Go App** (for testing on your device)
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## Installation & Setup

### Step 1: Navigate to the mobile directory
```bash
cd mobile
```

### Step 2: Install dependencies
```bash
npm install
```

This will install all required packages including:
- React Native
- Expo SDK
- React Navigation
- i18next (internationalization)
- Vector Icons

### Step 3: Start the development server
```bash
npm start
```

You'll see a QR code in your terminal.

### Step 4: Open on your device

**For Android:**
1. Open the Expo Go app
2. Tap "Scan QR code"
3. Point your camera at the QR code in the terminal

**For iOS:**
1. Open your Camera app
2. Point it at the QR code
3. Tap the notification to open in Expo Go

**For Emulator/Simulator:**
- Press `a` in the terminal to open Android emulator
- Press `i` in the terminal to open iOS simulator (macOS only)

## Features to Test

### 1. Ride Booking Interface
- Enter pickup location
- Enter destination
- Tap "Request Ride" button

### 2. Language Switching
- Tap the language button (EN/AR) in the top-right corner
- Interface switches between English and Arabic
- Arabic uses RTL (right-to-left) layout

### 3. Service Quick Access
- Three service buttons below the booking form:
  - Ride (car icon)
  - Lease (key icon)
  - Corporate (building icon)

### 4. Service Information
- Scroll down to see detailed service descriptions
- Each service has its own card with:
  - Icon
  - Title
  - Description

## Troubleshooting

### Error: "Unable to start server"
- Make sure no other process is using port 8081
- Run: `npx expo start --clear`

### Error: "Network response timed out"
- Check your firewall settings
- Ensure your computer and phone are on the same network
- Try using tunnel mode: `npm start -- --tunnel`

### TypeScript errors
- Run: `npx tsc --noEmit` to check for errors
- Errors should all be fixed

### Can't scan QR code
- Make sure Expo Go app is installed
- Try tunnel mode if on different networks
- Use `npm start -- --tunnel`

## Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# Start in tunnel mode (for different networks)
npm start -- --tunnel

# Run type checking
npx tsc --noEmit

# View all available commands
npm start -- --help
```

## Project Structure

```
mobile/
├── src/
│   ├── screens/
│   │   └── HomeScreen.tsx     # Main home screen
│   ├── locales/
│   │   ├── en.json            # English translations
│   │   └── ar.json            # Arabic translations
│   └── i18n.ts                # i18n configuration
├── App.tsx                    # App entry point
├── package.json               # Dependencies
└── app.json                   # Expo configuration
```

## Next Steps

After successfully running the app:

1. **Explore the code** in `src/screens/HomeScreen.tsx`
2. **Customize the UI** by modifying styles
3. **Add new features** based on requirements
4. **Test on both platforms** (Android & iOS)

## Building for Production

When ready to build for production:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

See [Expo documentation](https://docs.expo.dev/build/setup/) for detailed build instructions.

## Support

For issues or questions:
- Check the main README.md
- Review PROJECT_OVERVIEW.md
- Consult [Expo documentation](https://docs.expo.dev/)
- Consult [React Native documentation](https://reactnative.dev/)
