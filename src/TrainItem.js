import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";

const TrainItem = props => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        color="#64B82C"
        title={props.trainNumber.toString()}
        onPress={() => alert(props.trainNumber)}
      >
        {props.trainNumber.toString()}
      </Button>
    </View>
  );
};

export default TrainItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center"
  },
  button: { backgroundColor: "#64B82C" },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 10
  }
});
