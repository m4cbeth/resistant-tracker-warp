import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Settings({ goHome }: { goHome: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>This is a placeholder settings page.</Text>
      <Pressable style={styles.button} onPress={goHome}>
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  text: { color: '#9ca3af', marginBottom: 16 },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#e5e7eb', fontWeight: '600' },
});

