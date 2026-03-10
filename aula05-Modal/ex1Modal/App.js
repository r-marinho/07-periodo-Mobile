import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const ModalScreen = ({ animationType }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <Text>Teste de Animação: {animationType.toUpperCase()}</Text>
      <TouchableOpacity>
        <Text>Exibir Modal</Text>
      </TouchableOpacity>


      <Modal>
        <TouchableOpacity>
          <View>
            <Text>Informativo</Text>
            <Text>Você está visualizando uma transição do tipo "{animationType}"</Text>
            <TouchableOpacity>
              <Text>Entendido</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen> </Tab.Screen>
          <Tab.Screen> </Tab.Screen>
          <Tab.Screen> </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
