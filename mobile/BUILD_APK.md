# Build APK for 3A Transportation Mobile App

## Quick Build Guide

Due to container memory limitations, we'll use **Expo Application Services (EAS)** to build the APK in the cloud.

### Prerequisites

1. **Expo Account** - Sign up at https://expo.dev
2. **EAS CLI** - Already installed in this project

### Step 1: Login to Expo

```bash
cd /workspaces/3a/mobile
npx eas login
```

Enter your Expo credentials.

### Step 2: Build the APK

```bash
npx eas build --platform android --profile preview
```

This will:
- Upload your code to Expo's build servers
- Build the APK in the cloud (takes 5-15 minutes)
- Provide a download link when complete

### Step 3: Download and Install

1. Once the build completes, you'll get a download link
2. Open the link on your Android phone
3. Download the APK file
4. Install it (you may need to enable "Install from Unknown Sources")

## Alternative: Local Debug Build

If you want to test immediately without waiting for the build:

```bash
# Make sure you have the Expo Go app installed on your phone
# Download from: https://play.google.com/store/apps/details?id=host.exp.exponent

# Start the development server
npm start

# Scan the QR code with the Expo Go app
```

**Note:** The development server approach uses Expo Go and doesn't create an installable APK.

## Build Profiles (from eas.json)

- **preview** - Creates APK for testing (recommended for now)
- **production** - Creates production-ready APK/AAB for Play Store
- **development** - Creates development client

## Troubleshooting

### "Package name contains invalid characters"
✅ Already fixed - changed from `com.3a.transportation` to `com.threeA.transportation`

### Build fails with memory error
✅ Use EAS cloud build instead of local build

### Need Google Maps API key
You'll need to add a Google Maps API key for the maps to work:
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Maps SDK for Android"
4. Create credentials (API Key)
5. Add to `app.json`:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_API_KEY_HERE"
        }
      }
    }
  }
}
```

## What's Included in the APK

✅ Dark themed UI
✅ Animated map background with moving cars (captains)
✅ Location permission handling
✅ Bilingual support (Arabic/English)
✅ RTL support for Arabic
✅ User location-based map centering
✅ 15-20 animated car markers

## Install on Your Phone

1. Enable "Install from Unknown Sources" in Android settings
2. Download the APK from the link provided by EAS
3. Open the APK file
4. Tap "Install"
5. Open the app and grant location permissions when prompted
