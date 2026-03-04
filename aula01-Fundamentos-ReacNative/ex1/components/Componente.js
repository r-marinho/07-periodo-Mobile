import { View, Text, StyleSheet } from "react-native";

export default function Componente(){
    return(
        <View>
            <Text style={styles.text}>
                Exemplo de Componente
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24
    }
});