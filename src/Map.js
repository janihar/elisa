import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import init from "react_native_mqtt";
import { AsyncStorage } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const Map = ({latitude, longitude}) => {
  
  return (
    <MapView
      style={styles.mapStyle}
      provider={PROVIDER_GOOGLE}
      zoomEnabled={true}
    >
      {longitude !== 0 && latitude !== 0 && (
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      )}
    </MapView>
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
    height: Dimensions.get("window").height,
    top: 100
  }
});
