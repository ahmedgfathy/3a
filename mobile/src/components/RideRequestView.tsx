import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
    ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface RideRequestViewProps {
    pickup: string;
    destination: string;
    pickupCoords?: { lat: number; lng: number };
    destinationCoords?: { lat: number; lng: number };
    onClose: () => void;
}

export default function RideRequestView({
    pickup,
    destination,
    pickupCoords,
    destinationCoords,
    onClose,
}: RideRequestViewProps) {
    const [captainPosition, setCaptainPosition] = useState(0);

    // Default to Cairo if no coords
    const pickupLocation = pickupCoords || { lat: 30.0444, lng: 31.2357 };
    const destinationLocation = destinationCoords || { lat: 30.0626, lng: 31.2497 };

    // Generate route points
    const generateRoute = (
        start: { lat: number; lng: number },
        end: { lat: number; lng: number },
        points: number = 20
    ) => {
        const route = [];
        for (let i = 0; i <= points; i++) {
            const ratio = i / points;
            const lat = start.lat + (end.lat - start.lat) * ratio;
            const lng = start.lng + (end.lng - start.lng) * ratio;
            route.push([lat, lng]);
        }
        return route;
    };

    const route = generateRoute(pickupLocation, destinationLocation);

    // Leaflet map HTML with animated captain
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
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var route = ${JSON.stringify(route)};
        var map = L.map('map').fitBounds([
          [${pickupLocation.lat}, ${pickupLocation.lng}],
          [${destinationLocation.lat}, ${destinationLocation.lng}]
        ], { padding: [50, 50] });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);

        // Route line
        L.polyline(route, {
          color: '#FFD700',
          weight: 4,
          opacity: 0.8
        }).addTo(map);

        // Pickup marker
        L.marker([${pickupLocation.lat}, ${pickupLocation.lng}], {
          icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        }).addTo(map);

        // Destination marker
        L.marker([${destinationLocation.lat}, ${destinationLocation.lng}], {
          icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        }).addTo(map);

        // Captain marker (animated)
        var captainIcon = L.divIcon({
          html: '<div style="width:40px;height:40px;border-radius:20px;background:#FFD700;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="#000"/></svg></div>',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        var captainMarker = L.marker(route[0], { icon: captainIcon }).addTo(map);

        // Animate captain
        var currentIndex = 0;
        setInterval(function() {
          if (currentIndex < route.length - 1) {
            currentIndex++;
            captainMarker.setLatLng(route[currentIndex]);
          }
        }, 150);
      </script>
    </body>
    </html>
  `;

    return (
        <Modal visible={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Finding Captain</Text>
                        <Text style={styles.headerSubtitle}>Please wait...</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <MaterialCommunityIcons name="close" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Map - Top Half */}
                <View style={styles.mapContainer}>
                    <WebView
                        source={{ html: mapHTML }}
                        style={styles.map}
                    />

                    {/* Live Tracking Badge */}
                    <View style={styles.trackingBadge}>
                        <Text style={styles.trackingText}>Live Tracking</Text>
                        <Text style={styles.trackingSubtext}>Captain moving to pickup</Text>
                    </View>
                </View>

                {/* Ride Info - Bottom Half */}
                <ScrollView style={styles.infoContainer}>
                    {/* Route Details */}
                    <View style={styles.routeDetails}>
                        {/* Pickup */}
                        <View style={styles.locationRow}>
                            <View style={styles.locationIcon}>
                                <View style={styles.circleDot} />
                                <View style={styles.connectorLine} />
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>PICKUP</Text>
                                <Text style={styles.locationText}>{pickup || 'Current Location'}</Text>
                            </View>
                        </View>

                        {/* Destination */}
                        <View style={styles.locationRow}>
                            <View style={styles.locationIcon}>
                                <View style={styles.squareDot} />
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>DESTINATION</Text>
                                <Text style={styles.locationText}>{destination || 'Select destination'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Estimated Info */}
                    <View style={styles.estimateCard}>
                        <View style={styles.estimateRow}>
                            <View style={styles.estimateItem}>
                                <Text style={styles.estimateLabel}>ESTIMATED TIME</Text>
                                <Text style={styles.estimateValue}>12 min</Text>
                            </View>
                            <View style={styles.estimateItem}>
                                <Text style={styles.estimateLabel}>DISTANCE</Text>
                                <Text style={styles.estimateValue}>5.2 km</Text>
                            </View>
                        </View>
                    </View>

                    {/* Captain Info */}
                    <View style={styles.captainCard}>
                        <View style={styles.captainAvatar}>
                            <MaterialCommunityIcons name="car" size={28} color="#000" />
                        </View>
                        <View style={styles.captainInfo}>
                            <Text style={styles.captainName}>Captain Ahmed</Text>
                            <Text style={styles.captainDetails}>Toyota Corolla • ABC 1234</Text>
                        </View>
                        <View style={styles.captainRating}>
                            <Text style={styles.ratingText}>4.8 ★</Text>
                            <Text style={styles.etaText}>2 min away</Text>
                        </View>
                    </View>

                    {/* Status */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Captain is on the way to pickup location</Text>
                    </View>
                </ScrollView>

                {/* Cancel Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancel Ride</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#1F1F1F',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        color: '#FFD700',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#9CA3AF',
        fontSize: 14,
        marginTop: 4,
    },
    closeButton: {
        padding: 4,
    },
    mapContainer: {
        height: height * 0.4,
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    trackingBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    trackingText: {
        color: '#FFD700',
        fontSize: 14,
        fontWeight: 'bold',
    },
    trackingSubtext: {
        color: '#FFF',
        fontSize: 12,
        marginTop: 2,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#1F1F1F',
    },
    routeDetails: {
        padding: 20,
    },
    locationRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    locationIcon: {
        width: 30,
        alignItems: 'center',
    },
    circleDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFD700',
    },
    squareDot: {
        width: 12,
        height: 12,
        backgroundColor: '#FFF',
    },
    connectorLine: {
        width: 2,
        height: 40,
        backgroundColor: '#4B5563',
        marginTop: 4,
    },
    locationInfo: {
        flex: 1,
        marginLeft: 12,
    },
    locationLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        marginBottom: 4,
    },
    locationText: {
        color: '#FFF',
        fontSize: 16,
    },
    estimateCard: {
        backgroundColor: '#111',
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    estimateRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    estimateItem: {
        alignItems: 'center',
    },
    estimateLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        marginBottom: 4,
    },
    estimateValue: {
        color: '#FFD700',
        fontSize: 20,
        fontWeight: 'bold',
    },
    captainCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    captainAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captainInfo: {
        flex: 1,
        marginLeft: 12,
    },
    captainName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    captainDetails: {
        color: '#9CA3AF',
        fontSize: 14,
        marginTop: 2,
    },
    captainRating: {
        alignItems: 'flex-end',
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: 'bold',
    },
    etaText: {
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 2,
    },
    statusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFD700',
        marginRight: 12,
    },
    statusText: {
        color: '#FFD700',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    footer: {
        padding: 16,
        backgroundColor: '#1F1F1F',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    cancelButton: {
        backgroundColor: '#333',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
