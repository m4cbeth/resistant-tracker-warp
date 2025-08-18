import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp, getDocs, query, where, collection, documentId } from 'firebase/firestore';
import { format } from 'date-fns';

const daysCol = collection(db, 'days');

export type DayValue = { value: boolean; updatedAt?: any };

export const keyFor = (d: Date) => format(d, 'yyyy-MM-dd');

export async function getValuesForRange(start: Date, end: Date) {
  // Query docs where id between start..end using documentId() with lexicographic keys yyyy-MM-dd
  const startKey = format(start, 'yyyy-MM-dd');
  const endKey = format(end, 'yyyy-MM-dd');
  const q = query(daysCol, where(documentId(), '>=', startKey), where(documentId(), '<', endKey));
  const snap = await getDocs(q);
  const out: Record<string, boolean> = {};
  snap.forEach((d) => {
    const data = d.data() as DayValue;
    out[d.id] = !!data.value;
  });
  return out;
}

export async function toggleDay(day: Date, next: boolean) {
  const id = keyFor(day);
  const ref = doc(db, 'days', id);
  const curr = await getDoc(ref);
  if (!curr.exists() || (curr.data() as DayValue).value !== next) {
    await setDoc(ref, { value: next, updatedAt: serverTimestamp() }, { merge: true });
  }
}

