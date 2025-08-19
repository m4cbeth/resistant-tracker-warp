import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp, getDocs, query, where, collection, documentId } from 'firebase/firestore';
import { format } from 'date-fns';

export type DayValue = { value: boolean; updatedAt?: any };

export const keyFor = (d: Date) => format(d, 'yyyy-MM-dd');

function userDaysCollection() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No authenticated user');
  return collection(db, 'users', uid, 'days');
}

export async function getValuesForRange(start: Date, end: Date) {
  const startKey = format(start, 'yyyy-MM-dd');
  const endKey = format(end, 'yyyy-MM-dd');
  const q = query(userDaysCollection(), where(documentId(), '>=', startKey), where(documentId(), '<', endKey));
  const snap = await getDocs(q);
  const out: Record<string, boolean> = {};
  snap.forEach((d) => {
    const data = d.data() as DayValue;
    if (data.value === true) {
      out[d.id] = true;
    }
  });
  return out;
}

export async function toggleDay(day: Date, next: boolean) {
  const id = keyFor(day);
  const ref = doc(userDaysCollection(), id);
  const curr = await getDoc(ref);
  if (!curr.exists() || (curr.data() as DayValue).value !== next) {
    await setDoc(ref, { value: next, updatedAt: serverTimestamp() }, { merge: true });
  }
}

