import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { addWeeks, format } from 'date-fns';
import { WeekRow } from '../components/WeekRow';
import { getWeekStart, weekDays, dateKey } from '../utils/dates';
import { getValuesForRange, toggleDay } from '../services/days';
import { ensureAnonymousSignIn } from '../firebase';

const WINDOW = 30; // number of weeks kept around anchor

export default function EndlessCalendar() {
  const [anchor, setAnchor] = useState(getWeekStart(new Date()));
  const data = useMemo(() => Array.from({ length: WINDOW * 2 + 1 }, (_, i) => addWeeks(anchor, i - WINDOW)), [anchor]);

  const [values, setValues] = useState<Record<string, boolean>>({});

  // Ensure auth then load values for visible range
  useEffect(() => {
    let mounted = true;
    (async () => {
      await ensureAnonymousSignIn();
      if (!mounted) return;
      const start = data[0];
      const end = addWeeks(data[data.length - 1], 1);
      const set = await getValuesForRange(start, end);
      if (mounted) setValues((prev) => ({ ...prev, ...set }));
    })();
    return () => { mounted = false; };
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

  const renderItem = ({ item }: { item: Date }) => {
    const days = weekDays(item);
    const hasMonthStart = days.some((d) => d.getDate() === 1);
    const monthLabel = hasMonthStart ? format(days.find((d) => d.getDate() === 1)!, 'MMM') : undefined;
    return (
      <WeekRow days={days} values={values} onToggle={onToggle} monthLabel={monthLabel} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        keyExtractor={(d) => d.toISOString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.6}
        onEndReached={onEndReached}
        ListHeaderComponent={<View onLayout={headerOnLayout} />}
        initialScrollIndex={WINDOW}
        getItemLayout={(_, index) => ({ length: 72, offset: index * 72, index })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  list: { paddingVertical: 8 },
});

