import React from "react";
import { Text, View, StyleSheet } from 'react-native';

const Box = (props) => {
    return (
        <View style={styles.box}>
            <Text style={styles.text}>{props.nome}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#1e88e5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Box;