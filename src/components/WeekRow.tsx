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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <View style={styles.wrapper}>
      {monthLabel ? (
        <Text style={styles.monthLabel}>{monthLabel}</Text>
      ) : null}
      <View style={styles.row}>
        {days.map((d, idx) => {
          const key = dateKey(d);
          const hasRecord = values[key] === true;
          const isFuture = d > today;

          // Determine visual state: 'true' | 'false' | 'null'
          const state: 'true' | 'false' | 'null' = hasRecord ? 'true' : isFuture ? 'null' : 'false';

          // Weekend shading: Sunday (0) and Saturday (6) slightly lighter when state is null
          const isWeekend = idx === 0 || idx === 6;

          // Borders at month boundaries
          const month = d.getMonth();
          const nextDay = idx < 6 ? days[idx + 1] : undefined;
          const crossMonthRight = nextDay && nextDay.getMonth() !== month;
          const belowDay = addDays(d, 7);
          const crossMonthBelow = belowDay.getMonth() !== month;

          const bgStyle =
            state === 'true'
              ? styles.bgTrue
              : state === 'false'
              ? styles.bgFalse
              : isWeekend
              ? styles.bgWeekend
              : styles.bgWeekday;

          return (
            <Pressable
              key={key}
              style={[
                styles.cell,
                bgStyle,
                crossMonthRight && styles.borderRight,
                crossMonthBelow && styles.borderBottom,
              ]}
              disabled={isFuture}
              onPress={() => !isFuture && onToggle(d)}
            >
              {/* Background date number behind check/X */}
              <Text style={styles.dateNumber}>{d.getDate()}</Text>
              {/* Foreground mark based on state */}
              {state === 'true' ? (
                <Text style={styles.markTrue}>✓</Text>
              ) : state === 'false' ? (
                <Text style={styles.markFalse}>✗</Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'column', paddingHorizontal: 16 },
  // Month label: boldest available, slightly larger, aligned with Sunday column left edge
  monthLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 2,
    opacity: 0.95,
  },
  row: { flexDirection: 'row', paddingVertical: 6 },
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  // Base backgrounds
  bgWeekday: { backgroundColor: '#2e2e2e' },
  bgWeekend: { backgroundColor: '#1f1f1f' },
  // State-specific backgrounds
  bgTrue: { backgroundColor: '#052e16' }, // tailwind green-950
  bgFalse: { backgroundColor: '#000000' },
  borderRight: { borderRightColor: '#2b2b2b', borderRightWidth: 2 },
  borderBottom: { borderBottomColor: '#2b2b2b', borderBottomWidth: 2 },
  // Background date number
  dateNumber: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -14 }, { translateY: -14 }],
    fontSize: 28,
    fontWeight: '900',
    color: '#9ca3af', // gray-400
    opacity: 0.85,
  },
  // Foreground marks
  markTrue: { fontSize: 22, color: '#22c55e' }, // text-green-500
  markFalse: { fontSize: 22, color: '#ef4444' }, // text-red-500
});

