import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import EndlessCalendar from './src/screens/EndlessCalendar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <EndlessCalendar />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
