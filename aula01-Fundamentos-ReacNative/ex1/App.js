import { StyleSheet, Text, View } from 'react-native';
import HelloWorld from './components/HelloWorld';
import Greeting from './components/Greeting';
import Counter from './components/Counter';

export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld />
      <Greeting name="Gabriel" />
      <Greeting name="Miguel" />
      <Greeting name="Rafael" />
      <Counter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
