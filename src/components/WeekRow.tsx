import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { addDays } from 'date-fns';
import { dateKey } from '../utils/dates';

type Props = {
  days: Date[];
  values: Record<string, boolean | undefined>;
  onToggle: (day: Date) => void;
  monthLabel?: string;
};

export function WeekRow({ days, values, onToggle, monthLabel }: Props) {
  return (
    <View style={styles.wrapper}>
      {monthLabel ? (
        <Text style={styles.monthLabel}>{monthLabel}</Text>
      ) : null}
      <View style={styles.row}>
        {days.map((d, idx) => {
          const key = dateKey(d);
          const v = values[key];
          const month = d.getMonth();
          // Shading: alternate by month
          const monthShade = month % 2 === 0 ? styles.shadeEven : styles.shadeOdd;
          // Borders: right border if next day is next month; bottom border if same weekday next week is next month
          const nextDay = idx < 6 ? days[idx + 1] : undefined;
          const crossMonthRight = nextDay && nextDay.getMonth() !== month;
          const belowDay = addDays(d, 7);
          const crossMonthBelow = belowDay.getMonth() !== month;
          return (
            <Pressable
              key={key}
              style={[
                styles.cell,
                monthShade,
                crossMonthRight && styles.borderRight,
                crossMonthBelow && styles.borderBottom,
              ]}
              onPress={() => onToggle(d)}
            >
              <Text style={styles.label}>{v ? '✓' : '✗'}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'column' },
  monthLabel: { color: '#ffffff', marginBottom: 6, fontSize: 12, opacity: 0.9 },
  row: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 6 },
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 6,
    backgroundColor: '#2a2a2a',
  },
  shadeEven: { backgroundColor: '#2d2d2d' },
  shadeOdd: { backgroundColor: '#383838' },
  borderRight: { borderRightColor: '#ffffff', borderRightWidth: 2 },
  borderBottom: { borderBottomColor: '#ffffff', borderBottomWidth: 2 },
  label: { fontSize: 18, color: '#ffffff' },
});

