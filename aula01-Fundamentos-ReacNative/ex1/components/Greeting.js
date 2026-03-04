import { Text, StyleSheet } from "react-native";

export default function Greeting(props){
    const { name } = props
    return <Text style={styles.greeting}>Olá, {name}!</Text>
}

const styles = StyleSheet.create({
    greeting: {
        fontSize: 18,
        margin: 5
    }
});