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

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
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
    // Format message for WhatsApp
    const message = `Hello 3a Transportation,\n\nI would like to request a ride.\n\n📍 Pickup: ${pickupLocation || 'My Location'}\n🏁 Destination: ${destination || 'Not specified'}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '201234567890'; // Replace with actual support number
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          // Fallback for web or if whatsapp is not installed
          return Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
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
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <View style={styles.circleDot} />
            </View>
            <TextInput
              style={[styles.input, isRTL && styles.inputRTL]}
              placeholder={t('home.pickupLocation')}
              placeholderTextColor="#9CA3AF"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>

          {/* Connector Line */}
          <View style={styles.connectorLine} />

          {/* Destination Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <View style={styles.squareDot} />
            </View>
            <TextInput
              style={[styles.input, isRTL && styles.inputRTL]}
              placeholder={t('home.destination')}
              placeholderTextColor="#9CA3AF"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

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
              <MaterialCommunityIcons name="car" size={32} color="#FFD700" />
            </View>
            <Text style={styles.serviceLabel}>{t('home.services.ride')}</Text>
          </Pressable>

          <Pressable style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <MaterialCommunityIcons name="key" size={32} color="#FFD700" />
            </View>
            <Text style={styles.serviceLabel}>{t('home.services.lease')}</Text>
          </Pressable>

          <Pressable style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <MaterialCommunityIcons name="office-building" size={32} color="#FFD700" />
            </View>
            <Text style={styles.serviceLabel}>{t('home.services.corporate')}</Text>
          </Pressable>
        </View>

      </View>
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
  },
  serviceItem: {
    alignItems: 'center',
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD700', // Gold border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
});
