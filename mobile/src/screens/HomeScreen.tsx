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
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapBackground from '../components/MapBackground';

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
        // Permission already granted, get location
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
      } else {
        // Permission denied - show a more helpful message
        Alert.alert(
          t('home.location.permissionTitle'),
          t('home.location.permissionDenied'),
          [
            {
              text: t('home.location.cancel'),
              style: 'cancel',
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const handleRequestRide = () => {
    // Placeholder for ride request functionality
    alert(`${t('home.requestRide')}\n${t('home.pickupLocation')}: ${pickupLocation}\n${t('home.destination')}: ${destination}`);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.title, isRTL && styles.textRTL]}>
            {t('home.title')}
          </Text>
          <Text style={[styles.slogan, isRTL && styles.textRTL]}>
            {t('home.slogan')}
          </Text>
          <Text style={[styles.description, isRTL && styles.textRTL]}>
            {t('about.description')}
          </Text>
        </View>

        {/* Booking Widget */}
        <View style={styles.bookingWidget}>
          <Text style={[styles.widgetTitle, isRTL && styles.textRTL]}>
            {t('services.rideHailing.title')}
          </Text>

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

        {/* Quick Services */}
        <View style={styles.servicesGrid}>
          <Pressable style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <MaterialCommunityIcons name="car" size={28} color="#000" />
            </View>
            <Text style={[styles.serviceLabel, isRTL && styles.textRTL]}>
              {t('home.services.ride')}
            </Text>
          </Pressable>

          <Pressable style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <MaterialCommunityIcons name="key" size={28} color="#000" />
            </View>
            <Text style={[styles.serviceLabel, isRTL && styles.textRTL]}>
              {t('home.services.lease')}
            </Text>
          </Pressable>

          <Pressable style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <MaterialCommunityIcons name="office-building" size={28} color="#000" />
            </View>
            <Text style={[styles.serviceLabel, isRTL && styles.textRTL]}>
              {t('home.services.corporate')}
            </Text>
          </Pressable>
        </View>

        {/* Services Info */}
        <View style={styles.servicesInfo}>
          <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
            {t('services.title')}
          </Text>

          <View style={styles.serviceInfoCard}>
            <View style={styles.serviceInfoIcon}>
              <MaterialCommunityIcons name="car" size={24} color="#FFF" />
            </View>
            <View style={styles.serviceInfoContent}>
              <Text style={[styles.serviceInfoTitle, isRTL && styles.textRTL]}>
                {t('services.rideHailing.title')}
              </Text>
              <Text style={[styles.serviceInfoDesc, isRTL && styles.textRTL]}>
                {t('services.rideHailing.description')}
              </Text>
            </View>
          </View>

          <View style={styles.serviceInfoCard}>
            <View style={styles.serviceInfoIcon}>
              <MaterialCommunityIcons name="key" size={24} color="#FFF" />
            </View>
            <View style={styles.serviceInfoContent}>
              <Text style={[styles.serviceInfoTitle, isRTL && styles.textRTL]}>
                {t('services.leasing.title')}
              </Text>
              <Text style={[styles.serviceInfoDesc, isRTL && styles.textRTL]}>
                {t('services.leasing.description')}
              </Text>
            </View>
          </View>

          <View style={styles.serviceInfoCard}>
            <View style={styles.serviceInfoIcon}>
              <MaterialCommunityIcons name="office-building" size={24} color="#FFF" />
            </View>
            <View style={styles.serviceInfoContent}>
              <Text style={[styles.serviceInfoTitle, isRTL && styles.textRTL]}>
                {t('services.corporate.title')}
              </Text>
              <Text style={[styles.serviceInfoDesc, isRTL && styles.textRTL]}>
                {t('services.corporate.description')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly darker overlay for better content visibility
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 10,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
  },
  languageText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  slogan: {
    fontSize: 20,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#D1D5DB',
    lineHeight: 24,
  },
  textRTL: {
    textAlign: 'right',
  },
  bookingWidget: {
    backgroundColor: '#1F1F1F',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  squareDot: {
    width: 12,
    height: 12,
    backgroundColor: '#FFF',
  },
  connectorLine: {
    width: 2,
    height: 32,
    backgroundColor: '#4B5563',
    marginLeft: 19,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    color: '#FFF',
    fontSize: 16,
  },
  inputRTL: {
    textAlign: 'right',
  },
  requestButton: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  requestButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  serviceCard: {
    alignItems: 'center',
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  servicesInfo: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  serviceInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  serviceInfoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceInfoContent: {
    flex: 1,
  },
  serviceInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  serviceInfoDesc: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});
