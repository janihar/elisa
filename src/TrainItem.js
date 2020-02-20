import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";
import styles from "../src/styles/Styles"

const TrainItem = props => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        color="#64B82C"
        title={props.trainNumber.toString()}
        onPress={() =>
          props.navigation.push("Map", { train: props.trainNumber })
        }
      >
        {props.trainNumber.toString()}
      </Button>
    </View>
  );
};

TrainItem.propTypes = {
  trainNumber: PropTypes.number
};

export default TrainItem;


