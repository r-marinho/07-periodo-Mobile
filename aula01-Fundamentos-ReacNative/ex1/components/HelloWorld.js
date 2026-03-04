import { View, Text, StyleSheet } from "react-native";

export default function Componente(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Exemplo de Componente
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#016a97'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        margin: 10
    }
});