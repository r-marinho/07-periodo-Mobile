import React from "react";
import { View, Text } from "react-native";

export default function OlaMundo(props){
    return(
        <View>
            <Text>Olá </Text>
            <Text>{props.nome}!</Text>
        </View>
    );
}