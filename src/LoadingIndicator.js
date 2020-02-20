import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import PropTypes from "prop-types";

const LoadingIndicator = ({ text }) => {
  return (
    <View>
      <ActivityIndicator size="large" />
      <Text style={{ alignItems: "center", textAlign: "center" }}>{text}</Text>
    </View>
  );
};

LoadingIndicator.propTypes = {
  name: PropTypes.string
};

export default LoadingIndicator;
