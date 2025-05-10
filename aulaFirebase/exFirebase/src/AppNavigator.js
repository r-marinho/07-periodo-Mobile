import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RegisterScreen from "./screens/RegisterScreen";
import UsersListScreen from "./screens/UsersListScreen"

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Register">
                <Stack.Screen name="Register" component={RegisterScreen} options={{title: "Cadastro"}}/>
                <Stack.Screen name="UsersList" component={UsersListScreen} options={{title: "Usuários Cadastrados"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}