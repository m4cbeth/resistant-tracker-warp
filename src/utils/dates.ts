import { addDays, format, startOfWeek } from 'date-fns';

export const getWeekStart = (d: Date) => startOfWeek(d, { weekStartsOn: 0 });

export const weekDays = (weekStart: Date) =>
  Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

export const dateKey = (d: Date) => format(d, 'yyyy-MM-dd');

