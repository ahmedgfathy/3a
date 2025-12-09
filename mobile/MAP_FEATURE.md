# Mobile App Map Background Feature

## Overview
The mobile app now includes an animated dark map background on the home screen that displays nearby drivers (captains) as moving car markers.

## Features

### 1. Animated Map Background
- **Dark-themed map**: Custom dark Google Maps styling for better visibility and modern aesthetics
- **Animated car markers**: 10 car icons that continuously move around the map to simulate real-time driver locations
- **Location-based**: Map centers on user's current location when permission is granted
- **Fallback location**: Defaults to Cairo, Egypt if location permission is not granted

### 2. Location Permission
- **Permission request**: App requests location permission on first load
- **User-friendly prompts**: Translated permission messages in both English and Arabic
- **Graceful handling**: App works even if location permission is denied

### 3. Technical Implementation

#### New Components
- `MapBackground.tsx`: Reusable map component with animated markers
  - Uses `react-native-maps` for map rendering
  - Uses `expo-location` for location services
  - Implements smooth animations using React Native's Animated API

#### Modified Files
- `HomeScreen.tsx`: Integrated map background with overlay
- `app.json`: Added location permissions for iOS and Android
- `en.json` & `ar.json`: Added location permission translations

#### Dependencies Added
- `expo-location`: For requesting and accessing device location
- `react-native-maps`: For rendering Google Maps with custom styling

## User Experience

When users open the app:
1. They are prompted to grant location permission (one-time request)
2. If granted, the map centers on their current location
3. Animated car markers appear around their location, simulating nearby drivers
4. The dark overlay ensures the UI content remains readable over the map
5. All interactions work normally with the map as a background element

## Platform Support
- ✅ iOS: Location permissions configured in `infoPlist`
- ✅ Android: Location permissions added to manifest
- ✅ Bilingual: Full support for English and Arabic UI

## Future Enhancements
- Real-time driver data integration
- User location tracking
- Interactive map (zoom, pan)
- Driver availability indicators
