import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = { onHome: () => void };

export default function ProfileScreen({ onHome }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>This is a placeholder screen.</Text>
      <Pressable onPress={onHome} style={styles.button} accessibilityLabel="Go home">
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  text: { color: '#bbb', marginBottom: 16 },
  button: { backgroundColor: '#1f6feb', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
});

