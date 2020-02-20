import React, { useState, useEffect } from "react";
import { View } from "react-native";
import init from "react_native_mqtt";
import { AsyncStorage } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { dateFormat } from "./Functions/MapFunctions";
import styles from "./styles/Styles";
import LoadingIndicator from "./LoadingIndicator";

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

const Map = ({ route }) => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatidude] = useState(0);
  const { train } = route.params;

  const getTrain =  () => {
    const onMessageArrived =  message => {
      let trainLocation =  message.payloadString;
      let trainJson =  JSON.parse(trainLocation);
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
        client.subscribe(
          "train-locations/" + dateFormat(new Date()) + "/" + train,
          {
            qos: 0
          }
        );
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
          <LoadingIndicator text={"Paikannetaan junaa"} />
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
