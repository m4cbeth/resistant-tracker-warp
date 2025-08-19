import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = {
  onNavigate: (to: 'home' | 'profile' | 'settings') => void;
};

export default function Header({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  // Typical React Native status bar height approximations vary across platforms.
  // We'll use 24 as a baseline and size the header to 1.5x.
  const base = 50;
  const headerHeight = Math.round(base * 1.5);

  return (
    <View style={[styles.container, { paddingTop: base, height: base + headerHeight }] }>
      <StatusBar style="light" />
      <View style={styles.inner}>
        <Text style={styles.title}>Resistance Tracker™</Text>
        <View style={styles.right}>
          <Pressable onPress={() => setOpen((v) => !v)} accessibilityLabel="Open user menu">
            <View style={styles.avatar} />
          </Pressable>
          {open && (
            <View style={styles.menu}>
              <Pressable style={styles.menuItem} onPress={() => { setOpen(false); onNavigate('profile'); }}>
                <Text style={styles.menuText}>View your profile</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={() => { setOpen(false); onNavigate('settings'); }}>
                <Text style={styles.menuText}>Settings</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={() => { setOpen(false); /* dummy sign out */ }}>
                <Text style={styles.menuText}>Sign out</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderBottomColor: '#222',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  right: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#0F0',
    minWidth: 250,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    zIndex: 100,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#005',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
});

