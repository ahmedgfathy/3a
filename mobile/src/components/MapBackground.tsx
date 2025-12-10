import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CarMarker {
  id: number;
  latitude: number;
  longitude: number;
  heading: number;
}

interface MapBackgroundProps {
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

export default function MapBackground({ userLocation }: MapBackgroundProps) {
  const [carMarkers, setCarMarkers] = useState<CarMarker[]>([]);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Generate random car markers around user location or default Cairo location
    const centerLat = userLocation?.latitude || 30.0444;
    const centerLon = userLocation?.longitude || 31.2357;

    const markers: CarMarker[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      latitude: centerLat + (Math.random() - 0.5) * 0.02,
      longitude: centerLon + (Math.random() - 0.5) * 0.02,
      heading: Math.random() * 360,
    }));

    setCarMarkers(markers);

    // Animate cars
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [userLocation]);

  const centerLat = userLocation?.latitude || 30.0444;
  const centerLon = userLocation?.longitude || 31.2357;

  // Leaflet map HTML with animated car markers
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; background: #18181b; }
        .car-marker {
          width: 30px;
          height: 30px;
          background: #FFD700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          zoomControl: false,
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false,
          tap: false
        }).setView([${centerLat}, ${centerLon}], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
          opacity: 0.6
        }).addTo(map);

        // Add car markers
        var carMarkers = ${JSON.stringify(carMarkers)};
        
        carMarkers.forEach(function(car) {
          var carIcon = L.divIcon({
            html: '<div class="car-marker"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="#000"/></svg></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
          
          L.marker([car.latitude, car.longitude], { icon: carIcon }).addTo(map);
        });

        // Animate cars slightly
        var index = 0;
        setInterval(function() {
          index = (index + 1) % carMarkers.length;
          var car = carMarkers[index];
          car.latitude += (Math.random() - 0.5) * 0.0005;
          car.longitude += (Math.random() - 0.5) * 0.0005;
        }, 2000);
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      source={{ html: mapHTML }}
      style={styles.map}
      scrollEnabled={false}
      pointerEvents="none"
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
