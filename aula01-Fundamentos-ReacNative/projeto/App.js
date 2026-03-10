import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Componente from "./components/Componente";
import Greeting from "./components/Greeting";
import Counter from "./components/Counter";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <Componente />
          </View>

          <View style={styles.middleSection}>
            <Greeting name="Miguel" />
            <Greeting name="Gabriel" />
            <Greeting name="Rafael" />
          </View>

          <View style={styles.bottomSection}>
            <Counter />
          </View>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: '20',
    backgroundColor: '#c6cfff'
  },
  headerSection: {
    width: '100%'
  },
  middleSection: {
    alignItems: 'center'
  },
  bottomSection: {
    alignItems: 'center'
  }
})