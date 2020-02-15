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

const Search = (props) => {
  return (
    <View>
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
        onPress={props.onPress}
        title="Press Me"
      >
        Press Me
      </Button>
    </View>
  );
};
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

export default Search;
