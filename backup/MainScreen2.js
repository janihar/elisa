import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  Button
} from "react-native";
import init from "react_native_mqtt";
import { AsyncStorage } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

const MainScreen = () => {
  let la;
  let lo;
  const [train, setTrain] = useState([]);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatidude] = useState(0);

  const getTrain = async () => {
    const onConnect = async () => {
      alert("ha");
    };

    const onMessageArrived = async message => {
      let trainLocation = await message.payloadString;
      let trainJson = await JSON.parse(trainLocation);
      setLongitude(trainJson.location.coordinates[0]);
      setLatidude(trainJson.location.coordinates[1]);
    };

    const client = new Paho.MQTT.Client(
      "rata.digitraffic.fi",
      443,
      "myclientid_" + parseInt(Math.random() * 10000, 10)
    );

    client.onMessageArrived = onMessageArrived;
    var options = {
      useSSL: true,
      timeout: 3,
      //Gets Called if the connection has sucessfully been established
      onSuccess: function() {
        client.subscribe("train-locations/2020-02-15/177", {
          qos: 0
        });
      },
      //Gets Called if the connection could not be established
      onFailure: function(message) {
        alert("Connection failed: " + message.errorMessage);
      }
    };
    client.connect(options);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 50,
          height: 50,
          top: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
        source={require("../assets/lataus.png")}
      />
      <Text>KISSA</Text>
      <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} />
      <Button
        style={{ fontSize: 20, color: "green" }}
        styleDisabled={{ color: "red" }}
        onPress={getTrain}
        title="Press Me"
      >
        Press Me
      </Button>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
      >
        {longitude !== 0 && latitude !== 0 && (
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        )}
      </MapView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 100
  }
});
