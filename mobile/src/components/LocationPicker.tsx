import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapModal from './MapModal';

interface LocationPickerProps {
    value: string;
    onChange: (address: string, lat?: number, lng?: number) => void;
    placeholder: string;
    icon?: 'pickup' | 'destination';
}

export default function LocationPicker({
    value,
    onChange,
    placeholder,
    icon = 'pickup',
}: LocationPickerProps) {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleUseCurrentLocation = async () => {
        setIsLoadingLocation(true);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Please allow location access in your device settings.'
                );
                setIsLoadingLocation(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const { latitude, longitude } = location.coords;

            // Reverse geocode to get address
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                );
                const data = await response.json();
                const address = data.display_name || `${latitude}, ${longitude}`;
                onChange(address, latitude, longitude);
            } catch (error) {
                console.error('Geocoding error:', error);
                onChange(`${latitude}, ${longitude}`, latitude, longitude);
            }
        } catch (error) {
            console.error('Location error:', error);
            Alert.alert('Error', 'Unable to get your location. Please try again.');
        }

        setIsLoadingLocation(false);
    };

    return (
        <>
            <View style={styles.container}>
                {/* Icon indicator */}
                <View style={styles.iconContainer}>
                    <View
                        style={[
                            styles.dot,
                            icon === 'pickup' ? styles.circleDot : styles.squareDot,
                        ]}
                    />
                </View>

                {/* Input Field */}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                />

                {/* Action Buttons */}
                <View style={styles.buttonsContainer}>
                    {/* Current Location Button */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleUseCurrentLocation}
                        disabled={isLoadingLocation}
                    >
                        {isLoadingLocation ? (
                            <ActivityIndicator size="small" color="#FFD700" />
                        ) : (
                            <MaterialCommunityIcons name="navigation" size={18} color="#FFF" />
                        )}
                    </TouchableOpacity>

                    {/* Map Button */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setIsMapOpen(true)}
                    >
                        <MaterialCommunityIcons name="map-marker" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Connector Line (only for pickup) */}
            {icon === 'pickup' && <View style={styles.connectorLine} />}

            {/* Map Modal */}
            {isMapOpen && (
                <MapModal
                    onClose={() => setIsMapOpen(false)}
                    onSelectLocation={(address, lat, lng) => {
                        onChange(address, lat, lng);
                        setIsMapOpen(false);
                    }}
                    initialValue={value}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
    },
    circleDot: {
        borderRadius: 5,
        backgroundColor: '#FFD700',
    },
    squareDot: {
        backgroundColor: '#FFF',
    },
    input: {
        flex: 1,
        backgroundColor: '#111',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        gap: 4,
    },
    actionButton: {
        width: 40,
        height: 40,
        backgroundColor: '#333',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectorLine: {
        width: 2,
        height: 30,
        backgroundColor: '#4B5563',
        marginLeft: 14,
        marginVertical: 4,
    },
});
