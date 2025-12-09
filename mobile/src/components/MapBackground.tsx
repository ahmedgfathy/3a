import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CarMarker {
  id: string;
  latitude: number;
  longitude: number;
  animatedLat: Animated.Value;
  animatedLng: Animated.Value;
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

    // Create 10 car markers scattered around the user's location
    const initialCars: CarMarker[] = Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * 2 * Math.PI;
      const distance = 0.01 + Math.random() * 0.03;
      const lat = centerLat + distance * Math.cos(angle);
      const lng = centerLng + distance * Math.sin(angle);

      return {
        id: `car-${i}`,
        latitude: lat,
        longitude: lng,
        animatedLat: new Animated.Value(lat),
        animatedLng: new Animated.Value(lng),
      };
    });

    setCars(initialCars);
  }, [region.latitude, region.longitude]);

  // Animate cars moving around
  useEffect(() => {
    if (cars.length === 0) return;

    const animateCars = () => {
      cars.forEach((car) => {
        // Random small movements to simulate driving
        const newLat = car.latitude + (Math.random() - 0.5) * 0.002;
        const newLng = car.longitude + (Math.random() - 0.5) * 0.002;

        Animated.parallel([
          Animated.timing(car.animatedLat, {
            toValue: newLat,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: false,
          }),
          Animated.timing(car.animatedLng, {
            toValue: newLng,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: false,
          }),
        ]).start();

        // Update the base coordinates for next animation
        car.latitude = newLat;
        car.longitude = newLng;
      });
    };

    // Initial animation
    animateCars();

    // Continue animating every 5 seconds
    const interval = setInterval(animateCars, 5000);

    return () => clearInterval(interval);
  }, [cars]);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={region}
      customMapStyle={darkMapStyle}
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
    >
      {cars.map((car) => (
        <Marker.Animated
          key={car.id}
          coordinate={{
            latitude: car.animatedLat,
            longitude: car.animatedLng,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <MaterialCommunityIcons name="car" size={20} color="#FFF" />
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

// Dark map style for Google Maps
const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a8a8a' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1a1a1a' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#2c2c2c' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#181818' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1b1b1b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2c2c2c' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a8a8a' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#373737' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#3c3c3c' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#4e4e4e' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d3d3d' }],
  },
];
