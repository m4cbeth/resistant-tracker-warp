import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Pressable } from 'react-native';
import EndlessCalendar from './src/screens/EndlessCalendar';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import { ensureAnonymousSignIn, signOut } from './src/firebase';

type Route = 'home' | 'profile' | 'settings';

export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Ensure a user is signed in (anonymous by default)
    ensureAnonymousSignIn();
  }, []);

  const Header = (
    <View style={styles.header}>
      <Text style={styles.title}>Resistance Tracker ™</Text>
      <View style={styles.menuWrap}>
        {menuOpen && (
          <View style={styles.dropdown}>
            <Pressable style={styles.menuItem} onPress={() => { setRoute('profile'); setMenuOpen(false); }}>
              <Text style={styles.menuText}>View your profile</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => { setRoute('settings'); setMenuOpen(false); }}>
              <Text style={styles.menuText}>View settings</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={async () => { await signOut(); setRoute('home'); setMenuOpen(false); }}>
              <Text style={[styles.menuText, { color: '#f87171' }]}>Sign out</Text>
            </Pressable>
          </View>
        )}
        <Pressable accessibilityLabel="Avatar menu" onPress={() => setMenuOpen((m) => !m)} style={styles.avatarOuter}>
          <View style={styles.avatarInner} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Header}
      {route === 'home' && <EndlessCalendar />}
      {route === 'profile' && <Profile goHome={() => setRoute('home')} />}
      {route === 'settings' && <Settings goHome={() => setRoute('home')} />}
      <StatusBar style="light" />
=======
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
>>>>>>> fix-detached-head
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
<<<<<<< HEAD
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#000',
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '800' },
  menuWrap: { position: 'relative', alignItems: 'flex-end' },
  dropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: '#111',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#222',
    paddingVertical: 6,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    zIndex: 10,
  },
  menuItem: { paddingHorizontal: 12, paddingVertical: 10 },
  menuText: { color: '#e5e7eb', fontSize: 14 },
  avatarOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
=======
  inner: {
    flex: 1,
>>>>>>> fix-detached-head
  },
});
