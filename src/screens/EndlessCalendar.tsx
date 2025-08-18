import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { addWeeks } from 'date-fns';
import { WeekRow } from '../components/WeekRow';
import { getWeekStart, weekDays, dateKey } from '../utils/dates';
import { getValuesForRange, toggleDay } from '../services/days';

const WINDOW = 30; // number of weeks kept around anchor

export default function EndlessCalendar() {
  const [anchor, setAnchor] = useState(getWeekStart(new Date()));
  const data = useMemo(() => Array.from({ length: WINDOW * 2 + 1 }, (_, i) => addWeeks(anchor, i - WINDOW)), [anchor]);

  const [values, setValues] = useState<Record<string, boolean>>({});

  // Load values for visible range
  useEffect(() => {
    const start = data[0];
    const end = addWeeks(data[data.length - 1], 1);
    getValuesForRange(start, end).then((set) => setValues((prev) => ({ ...prev, ...set })));
  }, [data]);

  const onEndReached = useCallback(() => {
    setAnchor((a) => addWeeks(a, WINDOW));
  }, []);

  // For start reached, we use ListHeaderComponent to trigger when scrolled to top
  const headerOnLayout = useCallback(() => {
    // Shift backward when user scrolls near top
    setAnchor((a) => addWeeks(a, -WINDOW));
  }, []);

  const onToggle = useCallback(async (day: Date) => {
    const k = dateKey(day);
    setValues((prev) => {
      const next = !prev[k];
      // fire and forget write
      toggleDay(day, next);
      return { ...prev, [k]: next };
    });
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(d) => d.toISOString()}
      renderItem={({ item }) => (
        <WeekRow days={weekDays(item)} values={values} onToggle={onToggle} />
      )}
      onEndReachedThreshold={0.6}
      onEndReached={onEndReached}
      ListHeaderComponent={<View onLayout={headerOnLayout} />}
      initialScrollIndex={WINDOW}
      getItemLayout={(_, index) => ({ length: 56, offset: index * 56, index })}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 8 },
});

