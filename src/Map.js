import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Text
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

//Saving our MQQT socket
let client;

const Map = ({ navigation, route }) => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatidude] = useState(0);
  const { train } = route.params;

  //Getting current date
  const date = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() >= 10
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)) +
      "-" +
      today.getDate();

    return date.toString();
  };

  const getTrain = async state => {
    const onMessageArrived = async message => {
      let trainLocation = await message.payloadString;
      let trainJson = await JSON.parse(trainLocation);
      setLongitude(trainJson.location.coordinates[0]);
      setLatidude(trainJson.location.coordinates[1]);
    };
    //Random client
    client = new Paho.MQTT.Client(
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
        client.subscribe("train-locations/" + date() + "/" + train, {
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
  //component did mount
  useEffect(() => {
    getTrain();
  }, []);

  //component will unmount
  useEffect(() => {
    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <View>
      {latitude === 0 && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={{ alignItems: "center", textAlign: "center" }}>
            Paikannetaan junaa
          </Text>
        </View>
      )}

      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        initialRegion={{
          latitude: 61.9241104,
          longitude: 25.7481518,
          latitudeDelta: 18,
          longitudeDelta: 18
        }}
      >
        {longitude !== 0 && latitude !== 0 && (
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
