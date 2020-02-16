import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import init from "react_native_mqtt";
import { AsyncStorage } from "react-native";
import Map from "./Map";
import Search from "./Search";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

const MainScreen = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatidude] = useState(0);

  const getTrain = async () => {
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
      <Search onPress={getTrain} />
      <Map latitude={latitude} longitude={longitude} />
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
