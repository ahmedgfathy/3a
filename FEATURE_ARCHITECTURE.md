# Feature Architecture: Animated Map Background

## Component Hierarchy

```
App.tsx
└── HomeScreen.tsx
    ├── MapBackground.tsx (Full-screen background)
    │   ├── MapView (react-native-maps)
    │   │   └── Animated Car Markers (10x)
    │   └── Dark Map Styling
    ├── Map Overlay (40% opacity)
    ├── Header
    │   ├── Brand Logo
    │   └── Language Toggle
    └── ScrollView
        ├── Hero Section
        ├── Booking Widget
        ├── Quick Services Grid
        └── Services Info Cards
```

## Data Flow

```
User Opens App
    ↓
Request Location Permission (expo-location)
    ↓
    ├── GRANTED → Get Current Position
    │               ↓
    │         Set userLocation state
    │               ↓
    │         Map centers on user
    │
    └── DENIED → Show Alert
                    ↓
              Use default location (Cairo)

Map Initialization
    ↓
Calculate 10 car positions around center
    ↓
Create Animated.Value for each car (lat/lng)
    ↓
Render car markers on map
    ↓
Start animation loop (every 5 seconds)
    ├── Generate new random positions
    ├── Animate to new positions (3-5s)
    └── Repeat forever
```

## State Management

### HomeScreen.tsx
```typescript
State:
- pickupLocation: string          // User input for pickup
- destination: string             // User input for destination
- userLocation: {lat, lng} | null // Current GPS location
- locationPermission: Status | null // Permission status

Effects:
- useEffect(() => requestLocationPermission()) // On mount
```

### MapBackground.tsx
```typescript
Props:
- userLocation?: {lat, lng} | null // Passed from parent

State:
- cars: CarMarker[]               // Array of car marker data

Effects:
- useEffect(() => initializeCars()) // When location changes
- useEffect(() => animateCars())    // When cars array updates
```

## File Structure

```
mobile/
├── app.json                      // Permissions config
├── src/
│   ├── components/
│   │   └── MapBackground.tsx     // NEW: Map component
│   ├── screens/
│   │   └── HomeScreen.tsx        // MODIFIED: Added map
│   └── locales/
│       ├── en.json              // MODIFIED: Added location strings
│       └── ar.json              // MODIFIED: Added location strings
└── package.json                  // MODIFIED: New dependencies

public/
└── manifest.json                 // MODIFIED: Enhanced PWA config

src/app/[locale]/
└── layout.tsx                    // MODIFIED: Enhanced PWA metadata
```

## Animation Details

### Car Movement Animation
```
Every 5 seconds:
1. For each car marker:
   - Calculate new position (±0.002 degrees from current)
   - Create parallel animations for lat and lng
   - Duration: 3000-5000ms (randomized)
   - Easing: Default (smooth)
   - Update base coordinates for next cycle

2. Visual effect:
   - Cars appear to "drive" smoothly
   - Random directions create natural movement
   - Speed variations add realism
```

### Map Styling
```
Dark Theme Colors:
- Geometry: #1a1a1a (very dark gray)
- Roads: #2c2c2c to #4e4e4e (graduated grays)
- Water: #000000 (pure black)
- Labels: #8a8a8a to #bdbdbd (light grays)
- POI Parks: #181818 (near black)
```

## Performance Optimizations

1. **useNativeDriver: false**
   - Required for Animated.Value with map coordinates
   - Trade-off: Smoother animations vs. main thread usage

2. **Map Interaction Disabled**
   - scrollEnabled={false}
   - zoomEnabled={false}
   - Reduces unnecessary re-renders

3. **Fixed Car Count**
   - Always 10 markers
   - Predictable memory usage

4. **Animation Intervals**
   - 5-second intervals prevent excessive updates
   - 3-5 second transitions feel natural

5. **Conditional Rendering**
   - User location marker only shown if location granted
   - Reduces render complexity

## Integration Points

### Existing Features
- ✅ Language switching (EN/AR) works with map
- ✅ Booking widget overlays map correctly
- ✅ ScrollView works with map background
- ✅ Dark theme consistent across components

### Future Integration Points
- [ ] Connect to real driver API
- [ ] Sync car markers with actual driver locations
- [ ] Add driver selection by tapping markers
- [ ] Show driver details in popup
- [ ] Display ETA calculations
- [ ] Implement geofencing for service areas

## Dependencies

### Mobile App
```json
{
  "expo-location": "^17.0.8",
  "react-native-maps": "^1.19.0"
}
```

### Peer Dependencies (Already installed)
```json
{
  "@expo/vector-icons": "^15.0.3",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

## Configuration Requirements

### Google Maps API Key (Production)
For production deployment, add Google Maps API key:

**Android**: `android/app/src/main/AndroidManifest.xml`
```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_API_KEY_HERE"/>
```

**iOS**: `ios/[ProjectName]/AppDelegate.m`
```objc
#import <GoogleMaps/GoogleMaps.h>

[GMSServices provideAPIKey:@"YOUR_API_KEY_HERE"];
```

**Expo**: `app.json`
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_API_KEY_HERE"
        }
      }
    },
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

**Map not showing**
- Check Google Maps API key is configured
- Verify react-native-maps is properly linked
- Check console for API errors

**Location permission not working**
- Verify app.json has correct permission strings
- Check device settings allow location
- Test on physical device (not simulator)

**Animations choppy**
- Reduce number of car markers
- Increase animation duration
- Check device performance

**Dark overlay too dark/light**
- Adjust opacity in HomeScreen.tsx mapOverlay style
- Current: rgba(0, 0, 0, 0.4) = 40% opacity

## Testing Commands

```bash
# Type checking
cd mobile && npx tsc --noEmit

# Start development server
cd mobile && npm start

# Run on iOS simulator
cd mobile && npm run ios

# Run on Android emulator
cd mobile && npm run android

# Check for outdated dependencies
cd mobile && npm outdated
```
