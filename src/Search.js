import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import styles from "../src/styles/Styles";
import PropTypes from "prop-types";
const Search = props => {
  //For input, user want to search spefic train number
  const [specificTrain, setSpecificTrain] = useState();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/lataus.png")} />
      <TextInput
        placeholder="Syötä juna"
        style={styles.input}
        onChangeText={text => setSpecificTrain(text)}
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

Search.protoTypes = {
  fetchTrain: PropTypes.func
};

export default Search;
