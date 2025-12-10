import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import MapView, { Marker, UrlTile, PROVIDER_DEFAULT } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CarMarker {
  id: string;
  latitude: number;
  longitude: number;
  animatedLat: Animated.Value;
  animatedLng: Animated.Value;
  rotation: Animated.Value;
}

interface MapBackgroundProps {
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

export default function MapBackground({ userLocation }: MapBackgroundProps) {
  const [cars, setCars] = useState<CarMarker[]>([]);

  // Default location (Cairo, Egypt) if user location not available
  const defaultRegion = {
    latitude: 30.0444,
    longitude: 31.2357,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const region = userLocation
    ? {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    : defaultRegion;

  // Initialize car markers around user location
  useEffect(() => {
    const centerLat = region.latitude;
    const centerLng = region.longitude;

    // Create 15-20 car markers scattered around the user's location for better realism
    const numberOfCars = 15 + Math.floor(Math.random() * 6); // 15-20 cars
    const initialCars: CarMarker[] = Array.from({ length: numberOfCars }, (_, i) => {
      // Use a mix of circular and random distribution for natural placement
      const angle = (i / numberOfCars) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
      const distance = 0.005 + Math.random() * 0.035; // Varied distances
      const lat = centerLat + distance * Math.cos(angle);
      const lng = centerLng + distance * Math.sin(angle);

      return {
        id: `car-${i}`,
        latitude: lat,
        longitude: lng,
        animatedLat: new Animated.Value(lat),
        animatedLng: new Animated.Value(lng),
        rotation: new Animated.Value(Math.random() * 360), // Random initial rotation
      };
    });

    setCars(initialCars);
  }, [region.latitude, region.longitude]);

  // Animate cars moving around
  useEffect(() => {
    if (cars.length === 0) return;

    const animateCar = (car: CarMarker) => {
      // Generate a new destination with more realistic movement
      const angle = Math.random() * 2 * Math.PI;
      const distance = 0.001 + Math.random() * 0.004; // Smaller, more realistic movements
      const newLat = car.latitude + distance * Math.cos(angle);
      const newLng = car.longitude + distance * Math.sin(angle);

      // Calculate rotation based on movement direction
      const deltaLat = newLat - car.latitude;
      const deltaLng = newLng - car.longitude;
      const newRotation = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);

      const duration = 2000 + Math.random() * 3000; // 2-5 seconds for smoother movement

      Animated.parallel([
        Animated.timing(car.animatedLat, {
          toValue: newLat,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(car.animatedLng, {
          toValue: newLng,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(car.rotation, {
          toValue: newRotation,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Update the base coordinates for next animation
        car.latitude = newLat;
        car.longitude = newLng;
        // Recursively animate to create continuous movement
        animateCar(car);
      });
    };

    // Start animation for each car with a slight delay for natural effect
    cars.forEach((car, index) => {
      setTimeout(() => {
        animateCar(car);
      }, index * 200); // Stagger start times
    });

    return () => {
      // Cleanup - stop all animations
      cars.forEach((car) => {
        car.animatedLat.stopAnimation();
        car.animatedLng.stopAnimation();
        car.rotation.stopAnimation();
      });
    };
  }, [cars]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      // Use default provider (undefined) to support UrlTile
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      showsUserLocation={!!userLocation}
      showsMyLocationButton={false}
      showsCompass={false}
      showsTraffic={false}
      showsBuildings={false}
      showsIndoors={false}
      toolbarEnabled={false}
      loadingEnabled={true}
      loadingIndicatorColor="#FFD700"
    >
      {/* OpenStreetMap Fallback Tiles - Works without API Key */}
      <UrlTile
        urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
        zIndex={-1}
      />

      {/* Dark Overlay for OSM tiles to match app theme */}
      <UrlTile
        urlTemplate="http://tile.stamen.com/toner-lines/{z}/{x}/{y}.png" // Optional: Lines overlay or just use a View overlay in parent
        maximumZ={19}
        zIndex={-1}
        opacity={0} // Just placeholder, better handled by parent View overlay
      />
      {cars.map((car) => (
        <Marker.Animated
          key={car.id}
          coordinate={{
            latitude: car.animatedLat,
            longitude: car.animatedLng,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
          flat={true}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: car.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          >
            <MaterialCommunityIcons
              name="car"
              size={24}
              color="#FFD700"
              style={{ textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}
            />
          </Animated.View>
        </Marker.Animated>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

// Dark map style for Google Maps with enhanced styling
const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#0a0a0a' }], // Darker base
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6a6a6a' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#0a0a0a' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#1c1c1c' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7e7e7e' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5a5a5a' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0f1f0f' }], // Dark green for parks
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4a6a4a' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#0a0a0a' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1c1c1c' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7a7a7a' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#2a2a2a' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#3a3a3a' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4a4a4a' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#4a4a4a' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5a5a5a' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6a6a6a' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000a1a' }], // Deep dark blue for water
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#2a3a4a' }],
  },
];
