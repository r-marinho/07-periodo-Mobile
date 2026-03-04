import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HelloWorld from './components/HelloWorld'
import Greeting from './components/Greeting'
import Counter from './components/Counter'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <HelloWorld />
          </View>

          <View style={styles.middleSection}>
            <Greeting name="Gabriel" />
            <Greeting name="Miguel" />
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
    paddingVertical: 20
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