import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Componente = (props) => {
    return(
        <Text>Olá {props.nome}, seja bem vindo!</Text>
    );
};

export default Componente;