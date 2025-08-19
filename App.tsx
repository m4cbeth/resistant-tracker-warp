import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import EndlessCalendar from './src/screens/EndlessCalendar';
import Header from './src/components/Header';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

type Screen = 'home' | 'profile' | 'settings';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const handleNavigate = useCallback((to: Screen) => {
    setScreen(to);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Header onNavigate={handleNavigate} />
        {screen === 'home' && <EndlessCalendar />}
        {screen === 'profile' && <ProfileScreen onHome={() => handleNavigate('home')} />}
        {screen === 'settings' && <SettingsScreen onHome={() => handleNavigate('home')} />}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inner: {
    flex: 1,
  },
});
