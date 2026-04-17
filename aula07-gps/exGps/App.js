import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getLocation = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      if (!permission?.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          setErrorMsg("Permissão para acessar a localização negada.");
          setLoading(false);
          return;
        }
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setErrorMsg("Os serviços de localização estão desativados no dispositivo.");
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
    } catch (error) {
      console.log("Erro ao obter a localização:", error);
      setErrorMsg("Não foi possível obter a localização.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocation = () => {
    getLocation();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leitura de GPS</Text>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" />
          <Text style={styles.message}>Obtendo localização...</Text>
        </View>
      ) : errorMsg ? (
        <View style={styles.infoBox}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : location ? (
        <View style={styles.infoBox}>
          <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
          <Text style={styles.text}>Precisão: {location.coords.accuracy} metros</Text>
          <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}>
            <Text style={styles.buttonText}>Atualizar localização</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}>
          <Text style={styles.buttonText}>Obter localização</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingBox: {
    alignItems: "center",
  },
  infoBox: {
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#b00020",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    minWidth: 180,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});