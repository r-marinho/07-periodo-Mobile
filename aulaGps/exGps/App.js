import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from 'expo-location';

export default function App(){
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      console.log('Permissão de localização negada!');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleUpdateLocation = () => {
    getLocation();
  }

  return (
    <View style={styles.container}>
      {location ? (
        <View>
          <Text style={styles.text}>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
          <Button title="Atualizar localização" onPress={handleUpdateLocation} />
        </View>
      ) : (
        <Button title="Obter Localização" onPress={handleUpdateLocation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});