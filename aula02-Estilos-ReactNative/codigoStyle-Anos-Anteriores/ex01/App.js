import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Component from './components/Componente';
import Styles from './styles/styles';

//Estilo Inline
export default function App() {
  return (
    <View style={Styles.container}>
      <Component nome="Rafael" />
      <Text style={Styles.text}>Olá, React Native!!!</Text>
    </View>
  );
}
