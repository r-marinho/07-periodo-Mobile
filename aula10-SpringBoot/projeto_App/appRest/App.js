import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'

import PessoaListScreen from './src/screens/PessoaListScreen'
import PessoaFormScreen from './src/screens/PessoaFormScreen'
import PessoaDetailScreen from './src/screens/PessoaDetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="PessoaList"
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff' },
            headerTitleStyle: { fontWeight: '700' },
            headerTintColor: '#0f172a',
            contentStyle: { backgroundColor: '#f8fafc' }
          }}
        >
          <Stack.Screen
            name="PessoaList"
            component={PessoaListScreen}
            options={{ title: 'Lista de Pessoas' }}
          />
          <Stack.Screen
            name="PessoaDetail"
            component={PessoaDetailScreen}
            options={{ title: 'Detalhes da Pessoa' }}
          />
          <Stack.Screen
            name="PessoaForm"
            component={PessoaFormScreen}
            options={{ title: 'Cadastro' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}