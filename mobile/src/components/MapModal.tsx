import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface MapModalProps {
    onClose: () => void;
    onSelectLocation: (address: string, lat: number, lng: number) => void;
    initialValue?: string;
}

export default function MapModal({
    onClose,
    onSelectLocation,
    initialValue,
}: MapModalProps) {
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [address, setAddress] = useState(initialValue || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mapCenter, setMapCenter] = useState({ lat: 30.0444, lng: 31.2357 });

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

                setMapCenter({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                });
                setSelectedLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                reverseGeocode(location.coords.latitude, location.coords.longitude);
            }
        } catch (error) {
            console.error('Error getting location:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            const data = await response.json();
            setAddress(data.display_name || `${lat}, ${lng}`);
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            setAddress(`${lat}, ${lng}`);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery
                )}&addressdetails=1&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);

                setMapCenter({ lat, lng });
                setSelectedLocation({ latitude: lat, longitude: lng });
                setAddress(result.display_name);
            } else {
                alert('Location not found. Please try a different search.');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed. Please try again.');
        }
        setIsSearching(false);
    };

    const handleConfirm = () => {
        if (selectedLocation && address) {
            onSelectLocation(address, selectedLocation.latitude, selectedLocation.longitude);
        }
    };

    // Leaflet map HTML
    const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${mapCenter.lat}, ${mapCenter.lng}], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);

        var marker = L.marker([${selectedLocation?.latitude || mapCenter.lat}, ${selectedLocation?.longitude || mapCenter.lng}], {
          icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        }).addTo(map);

        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'locationSelected',
            lat: e.latlng.lat,
            lng: e.latlng.lng
          }));
        });
      </script>
    </body>
    </html>
  `;

    const handleWebViewMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'locationSelected') {
                setSelectedLocation({ latitude: data.lat, longitude: data.lng });
                reverseGeocode(data.lat, data.lng);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    return (
        <Modal visible={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Select Location</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <MaterialCommunityIcons name="close" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search for an address..."
                        placeholderTextColor="#9CA3AF"
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={handleSearch}
                        disabled={isSearching}
                    >
                        {isSearching ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <MaterialCommunityIcons name="magnify" size={24} color="#000" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Map */}
                <View style={styles.mapContainer}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FFD700" />
                        </View>
                    ) : (
                        <WebView
                            source={{ html: mapHTML }}
                            style={styles.map}
                            onMessage={handleWebViewMessage}
                        />
                    )}
                </View>

                {/* Selected Address */}
                {address && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressLabel}>Selected Address:</Text>
                        <Text style={styles.addressText}>{address}</Text>
                    </View>
                )}

                {/* Action Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.confirmButton,
                            (!selectedLocation || !address) && styles.confirmButtonDisabled,
                        ]}
                        onPress={handleConfirm}
                        disabled={!selectedLocation || !address}
                    >
                        <Text style={styles.confirmButtonText}>Confirm Location</Text>
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
        backgroundColor: '#1F1F1F',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        color: '#FFD700',
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#1F1F1F',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#FFF',
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#FFD700',
        borderRadius: 12,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressContainer: {
        padding: 16,
        backgroundColor: '#1F1F1F',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    addressLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        marginBottom: 4,
    },
    addressText: {
        color: '#FFF',
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
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
    confirmButton: {
        flex: 1,
        backgroundColor: '#FFD700',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    confirmButtonDisabled: {
        opacity: 0.5,
    },
    confirmButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
