import { View, Text, StyleSheet } from "react-native";
import Counter from "./Counter";

export default function Componente() {
    return (
        <View>
            <Text style={styles.text}>Exemplo de Componente</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})