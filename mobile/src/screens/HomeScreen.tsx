import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  I18nManager,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapBackground from '../components/MapBackground';
import LocationPicker from '../components/LocationPicker';
import RideRequestView from '../components/RideRequestView';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number }>();
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number }>();
  const [isRideRequested, setIsRideRequested] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus | null>(null);
  const isRTL = i18n.language === 'ar';

  // Request location permission on mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      // First check if permission is already granted
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();

      if (existingStatus === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocationPermission(existingStatus);
        return;
      }

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      // Removed the alert for permission denied to keep UI clean
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const handleRequestRide = () => {
    if (!pickupLocation || !destination) {
      alert('Please select both pickup and destination locations');
      return;
    }
    setIsRideRequested(true);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Map Background */}
      <View style={styles.mapContainer}>
        <MapBackground userLocation={userLocation} />
        {/* Dark overlay to make content readable */}
        <View style={styles.mapOverlay} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>{t('home.brand')}</Text>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={toggleLanguage}
        >
          <Text style={styles.languageText}>
            {i18n.language === 'en' ? 'AR' : 'EN'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content - Centered */}
      <View style={styles.mainContent}>

        {/* Booking Widget */}
        <View style={styles.bookingWidget}>
          {/* Pickup Location Input */}
          <LocationPicker
            value={pickupLocation}
            onChange={(address, lat, lng) => {
              setPickupLocation(address);
              if (lat && lng) setPickupCoords({ lat, lng });
            }}
            placeholder={t('home.pickupLocation')}
            icon="pickup"
          />

          {/* Destination Input */}
          <LocationPicker
            value={destination}
            onChange={(address, lat, lng) => {
              setDestination(address);
              if (lat && lng) setDestinationCoords({ lat, lng });
            }}
            placeholder={t('home.destination')}
            icon="destination"
          />

          {/* Request Ride Button */}
          <TouchableOpacity
            style={styles.requestButton}
            onPress={handleRequestRide}
          >
            <Text style={styles.requestButtonText}>
              {t('home.requestRide')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Services Icons - Floating at bottom */}
        <View style={styles.servicesContainer}>
          <Pressable style={styles.serviceItem} onPress={handleRequestRide}>
            <View style={styles.serviceIconContainer}>
              <MaterialCommunityIcons name="car" size={36} color="#FFD700" />
            </View>
          </Pressable>

          <Pressable style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <MaterialCommunityIcons name="key" size={36} color="#FFD700" />
            </View>
          </Pressable>
        </View>

      </View>

      {/* Ride Request View */}
      {isRideRequested && (
        <RideRequestView
          pickup={pickupLocation}
          destination={destination}
          pickupCoords={pickupCoords}
          destinationCoords={destinationCoords}
          onClose={() => setIsRideRequested(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly clearer overlay to see map
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 50,
    paddingBottom: 20,
    zIndex: 10,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  languageText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-end', // Push content to bottom
    paddingBottom: 40,
  },
  bookingWidget: {
    backgroundColor: '#1F1F1F',
    marginHorizontal: 20,
    marginBottom: 30, // Space between widget and icons
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700', // Gold
  },
  squareDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF',
  },
  connectorLine: {
    width: 2,
    height: 30,
    backgroundColor: '#4B5563',
    marginLeft: 14,
    marginVertical: 4,
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
  inputRTL: {
    textAlign: 'right',
  },
  requestButton: {
    backgroundColor: '#FFD700', // Gold button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  requestButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  serviceItem: {
    alignItems: 'center',
  },
  serviceIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000000', // Pure Black
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700', // Gold Border
    shadowColor: '#FFD700', // Gold Shadow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  // Removed serviceLabel
});
