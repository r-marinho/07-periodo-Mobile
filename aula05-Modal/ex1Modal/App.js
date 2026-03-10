import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/**
 * Componente de Modal Aprimorado
 * @param {string} animation - O tipo de animação (slide, fade, none)
 * @param {string} color - Uma cor específica para identificar visualmente a aba
 */
const CustomModalScreen = ({ animation, themeColor }) => {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: themeColor + '10' }]}>
      <Text style={[styles.headerText, { color: themeColor }]}>
        Modo: {animation.toUpperCase()}
      </Text>
      
      <TouchableOpacity 
        style={[styles.mainButton, { backgroundColor: themeColor }]} 
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>TESTAR {animation.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal
        animationType={animation} // Aqui o React Native define a física da transição
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        {/* Backdrop: Fechar ao tocar fora */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setVisible(false)}
        >
          {/* Card do Modal */}
          <View style={styles.modalCard}>
            <View style={[styles.colorIndicator, { backgroundColor: themeColor }]} />
            
            <Text style={styles.modalTitle}>Animação {animation}</Text>
            
            <Text style={styles.modalBody}>
              {animation === 'slide' && "Perceba como eu subi suavemente do fundo da tela."}
              {animation === 'fade' && "Perceba como eu surgi alterando a opacidade (transparência)."}
              {animation === 'none' && "Eu apareci instantaneamente, sem transição suave."}
            </Text>
            
            <TouchableOpacity 
              style={[styles.closeButton]} 
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{ 
            headerShown: false,
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            tabBarActiveTintColor: '#000',
          }}
        >
          {/* 
              Criamos três abas distintas. 
              Ao trocar de aba, o componente é remontado, 
              garantindo que a animação do Modal seja processada do zero.
          */}
          <Tab.Screen name="SLIDE">
            {() => <CustomModalScreen animation="slide" themeColor="#2196F3" />}
          </Tab.Screen>
          
          <Tab.Screen name="FADE">
            {() => <CustomModalScreen animation="fade" themeColor="#4CAF50" />}
          </Tab.Screen>
          
          <Tab.Screen name="NONE">
            {() => <CustomModalScreen animation="none" themeColor="#FF9800" />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
  },
  mainButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo mais escuro para destacar o modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    overflow: 'hidden', // Garante que o indicador de cor respeite o arredondamento
  },
  colorIndicator: {
    width: '120%',
    height: 10,
    position: 'absolute',
    top: 0,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  modalBody: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
});