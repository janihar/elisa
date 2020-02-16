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

const Search = props => {
  //For input, user want to search spefic train number
  const [specificTrain, setSpecificTrain] = useState();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/lataus.png")} />
      <TextInput
        style={styles.input}
        onChangeText={text => setSpecificTrain(text)}
        keyboardType="numeric"
      />
      <View style={styles.button}>
        <Button
          color="#64B82C"
          onPress={() => props.fetchTrain(specificTrain)}
          title="HAE"
        >
          HAE
        </Button>
      </View>
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
  image: {
    flex: 1,
    width: 200,
    height: 50,
    resizeMode: "contain"
  },
  input: {
    height: 40,
    bottom: 20,
    width: Dimensions.get("window").width / 1.5,
    borderColor: "gray",
    borderWidth: 1
  },
  button: {
    fontSize: 20,
    width: Dimensions.get("window").width / 2,
    borderRadius: 25,
    color: "#64B82C"
  }
});

export default Search;
