# 3a Transportation - Mobile App

This is the React Native mobile application for 3a Transportation, built with Expo.

## Features

- **Ride Booking**: Request a ride with pickup and destination locations
- **Multi-language Support**: English and Arabic with RTL support
- **Service Overview**: Quick access to Ride, Lease, and Corporate services
- **Dark Theme**: Modern dark-themed UI optimized for mobile

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Start the development server:
```bash
npm start
```

#### Run on specific platform:
```bash
npm run android  # For Android
npm run ios      # For iOS (macOS only)
npm run web      # For Web browser
```

#### Testing on your device:

1. Install the Expo Go app on your device:
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code shown in the terminal with:
   - Android: Expo Go app
   - iOS: Camera app

## Project Structure

```
mobile/
├── src/
│   ├── screens/          # Screen components
│   │   └── HomeScreen.tsx
│   ├── locales/          # Translation files
│   │   ├── en.json
│   │   └── ar.json
│   └── i18n.ts          # i18n configuration
├── App.tsx              # Main app component
└── package.json
```

## Available Languages

- English (en)
- Arabic (ar) with RTL support

Toggle languages using the language button in the top-right corner.

## Core Functionality

The app replicates the website's home page functionality:

1. **Ride Request Form**:
   - Pickup location input
   - Destination input
   - Request ride button

2. **Quick Service Access**:
   - Ride-hailing service
   - Car leasing service
   - Corporate transportation

3. **Service Information**:
   - Detailed descriptions of each service
   - Contact and booking information

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development and build tooling
- **TypeScript**: Type-safe JavaScript
- **i18next**: Internationalization framework
- **React Navigation**: Navigation library (ready for expansion)
- **Expo Vector Icons**: Icon library

## Future Enhancements

- WhatsApp integration for ride booking
- Real-time driver tracking
- User authentication
- Ride history
- Payment integration
- Push notifications

## License

Private - All rights reserved by 3a Transportation
