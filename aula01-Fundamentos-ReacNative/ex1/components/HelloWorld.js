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
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#7e0000',
        margin: 10
    }
});