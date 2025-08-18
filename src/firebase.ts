import Constants from 'expo-constants';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = (Constants.expoConfig as any)?.extra?.firebase
  || (Constants.manifest as any)?.extra?.firebase
  || {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
// Use React Native persistence for Auth
export const auth = getApps().length ? getAuth() : initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage as any),
});
// Enable long polling for Firestore to better support Expo Go/tunnels
initializeFirestore(app, { experimentalAutoDetectLongPolling: true, useFetchStreams: false });
export const db = getFirestore(app);

export async function ensureAnonymousSignIn(): Promise<void> {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          await signInAnonymously(auth);
        }
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        unsub();
      }
    });
  });
}

