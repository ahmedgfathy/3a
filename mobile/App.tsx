import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import './src/i18n'; // Initialize i18n
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
