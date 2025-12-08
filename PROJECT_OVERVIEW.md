# 3a Transportation - Project Overview

This repository contains both the web application and mobile application for 3a Transportation.

## Project Structure

```
3a/
├── src/                    # Next.js web application
│   ├── app/
│   ├── i18n/
│   └── middleware.ts
├── mobile/                 # React Native mobile application
│   ├── src/
│   │   ├── screens/
│   │   ├── locales/
│   │   └── i18n.ts
│   ├── App.tsx
│   ├── package.json
│   └── README.md
├── messages/              # Web app translations
│   ├── en.json
│   └── ar.json
├── public/               # Web app assets
├── package.json          # Web app dependencies
└── README.md            # This file
```

## Applications

### Web Application (Next.js)

The main website for 3a Transportation built with Next.js 16, featuring:
- Multi-language support (English/Arabic with RTL)
- Dark mode support
- Ride-hailing, leasing, and corporate transportation services
- Responsive design

**Running the web app:**
```bash
npm install
npm run dev
```

Visit: http://localhost:3000

### Mobile Application (React Native + Expo)

Native mobile app with the same core functionality as the website, optimized for mobile devices.

**Running the mobile app:**
```bash
cd mobile
npm install
npm start
```

Then:
- Use Expo Go app to scan the QR code on your device
- Press 'a' for Android emulator
- Press 'i' for iOS simulator (macOS only)

**See `mobile/README.md` for detailed mobile app documentation.**

## Key Features (Both Platforms)

1. **Ride Booking Interface**
   - Pickup location input
   - Destination input
   - Request ride functionality

2. **Multi-language Support**
   - English and Arabic
   - RTL layout for Arabic
   - Language switcher

3. **Service Offerings**
   - Ride-hailing via WhatsApp
   - Car leasing and sales
   - Corporate transportation contracts

4. **Modern UI/UX**
   - Dark theme
   - Clean, minimalist design
   - Optimized for both platforms

## Development

### Web Development
- Framework: Next.js 16
- Styling: Tailwind CSS
- i18n: next-intl
- Icons: lucide-react

### Mobile Development
- Framework: React Native (Expo)
- Language: TypeScript
- i18n: i18next + react-i18next
- Icons: Expo Vector Icons
- Navigation: React Navigation (ready for expansion)

## Building for Production

### Web
```bash
npm run build
npm start
```

### Mobile
See Expo documentation for building APK/IPA:
- [Android Build](https://docs.expo.dev/build/setup/)
- [iOS Build](https://docs.expo.dev/build/setup/)

## License

Private - All rights reserved by 3a Transportation
