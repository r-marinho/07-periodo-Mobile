import { useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";

export default function Counter(){
    const [count, setCount] = useState(0);

    return(
        <View style={styles.container}>
            <Text style={styles.counter}>Você clicou {count} vezes.</Text>
            <Button title="Clique aqui" onPress={() => setCount(count + 1)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counter: {
        fontSize: 20,
        marginBottom: 20
    }
})