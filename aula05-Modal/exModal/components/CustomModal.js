
import { useState } from "react"
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CustomModalScreen = ({ animation, themeColor }) => {
    const [visible, setVisible] = useState(false);

    return (
        <SafeAreaView style={[styles.screenContainer, {backgroundColor: themeColor + 10}]}>
            <Text style={[styles.headerText, { color: themeColor}]}>
                Modo: {animation.toUpperCase()}
            </Text>

            <TouchableOpacity
                style={[styles.mainButton, {backgroundColor: themeColor} ]}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.buttonText}>ABRIR MODAL {animation.toUpperCase()}</Text>
            </TouchableOpacity>

            <Modal
                animationType={animation}
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}  
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modalCard}>
                        <View style={[styles.colorIndicator, {backgroundColor: themeColor }]}/>

                        <Text style={styles.modalTitle}>Animação {animation}</Text>

                        <Text style={styles.modalBody}>Esta transição demonstra o comportamento nativo do tipo {animation}</Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>
                                FECHAR
                            </Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    overflow: 'hidden', 
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

export default CustomModalScreen;