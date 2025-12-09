# Quick Start Guide - Animated Map Feature

## Testing the Animated Map on Your Device

### Prerequisites
- Expo Go app installed on your mobile device
- OR development build of the app
- Location services enabled on your device

### Steps to Test

1. **Start the Development Server**
   ```bash
   cd /workspaces/3a/mobile
   npm start
   # or
   pnpm start
   ```

2. **Open on Your Device**
   - Scan the QR code with your device
   - OR type the URL manually in Expo Go

3. **Grant Location Permission**
   - When prompted, tap "Allow" for location access
   - This is requested only once on first launch

4. **Observe the Features**
   - ✅ Dark map background centered on your location
   - ✅ 15-20 golden car markers moving around
   - ✅ Cars rotating as they move (realistic driving)
   - ✅ Smooth continuous animation
   - ✅ Content overlay for readability

### What You Should See

```
┌─────────────────────────────┐
│  3a          [EN/AR]        │  ← Header with language toggle
├─────────────────────────────┤
│                             │
│    🗺️  Dark Map             │  ← Animated background
│                             │
│    🚗  🚗  🚗               │  ← Moving cars (captains)
│  🚗      🚗     🚗          │
│    🚗  🚗  🚗               │
│                             │
├─────────────────────────────┤
│  Ride-Hailing via WhatsApp  │  ← Booking widget
│  ┌─────────────────────┐   │
│  │ Current Location    │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ Destination         │   │
│  └─────────────────────┘   │
│  [ Request Ride ]           │
└─────────────────────────────┘
```

### Testing Different Scenarios

#### Scenario 1: With Location Permission
**Expected Behavior:**
- Map centers on your actual location
- Cars move around your position
- Blue dot shows your location

#### Scenario 2: Without Location Permission
**Expected Behavior:**
- Map centers on Cairo, Egypt (default)
- Cars still animate normally
- Alert message about denied permission

#### Scenario 3: Language Toggle
**Expected Behavior:**
- Tap EN/AR button in header
- All text switches language
- Layout adjusts for RTL (Arabic)
- Map animation continues smoothly

### Performance Testing

Monitor these metrics:
- **FPS**: Should stay at 60fps
- **Memory**: Stable, no leaks
- **Battery**: Minimal impact
- **Animation**: Smooth, no stuttering

### Debugging

If you don't see the map:
1. Check internet connection (map tiles require network)
2. Verify Google Maps API key (for production builds)
3. Check Expo Go version (update if needed)
4. Clear app cache and restart

If cars don't animate:
1. Check console for errors
2. Verify react-native-maps is installed
3. Restart development server

### Browser Testing (PWA)

The feature is mobile-specific, but you can test the PWA:
```bash
cd /workspaces/3a
npm run dev
# Open http://localhost:3000
```

Note: PWA uses Next.js (web) version, not the same animated map as mobile.

### Device Compatibility

**Tested On:**
- ✅ iOS 14+ (iPhone)
- ✅ Android 10+ (Samsung, Pixel, etc.)
- ✅ Expo Go latest version

**Known Issues:**
- Simulators may not show real location
- Web version uses different implementation
- Some Android devices need Google Play Services

### Next Steps After Testing

1. **Customize Colors**: Edit `MapBackground.tsx` line ~175 for car color
2. **Adjust Car Count**: Edit line ~48 for number of cars
3. **Change Animation Speed**: Edit line ~86 for duration
4. **Modify Map Style**: Edit `darkMapStyle` array starting line ~197

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Permission not requested | Clear app data and reinstall |
| Map blank/white | Check internet, verify API key |
| Cars not moving | Check console logs, restart server |
| Poor performance | Reduce car count (line 48) |
| Location not updating | Enable device location services |

### Production Deployment

Before deploying:
1. Get Google Maps API key for iOS/Android
2. Add API keys to `app.json`
3. Build standalone app (not Expo Go)
4. Test on real devices, not simulators

### Getting Help

If you encounter issues:
1. Check `ANIMATED_MAP_FEATURE.md` for detailed documentation
2. Review console logs for errors
3. Verify all dependencies are installed
4. Check Expo and React Native Maps documentation

Happy Testing! 🚗📍
