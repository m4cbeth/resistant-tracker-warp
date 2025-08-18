import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { dateKey } from '../utils/dates';

type Props = {
  days: Date[];
  values: Record<string, boolean | undefined>;
  onToggle: (day: Date) => void;
};

export function WeekRow({ days, values, onToggle }: Props) {
  return (
    <View style={styles.row}>
      {days.map((d) => {
        const key = dateKey(d);
        const v = values[key];
        return (
          <Pressable key={key} style={[styles.cell, v ? styles.ok : styles.bad]} onPress={() => onToggle(d)}>
            <Text style={styles.label}>{v ? '✓' : '✗'}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 4 },
  cell: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', margin: 2, borderRadius: 6, backgroundColor: '#eee' },
  ok: { backgroundColor: '#c7f5c4' },
  bad: { backgroundColor: '#fbd3d0' },
  label: { fontSize: 18 }
});

