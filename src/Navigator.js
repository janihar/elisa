import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TrainScreen from "./TrainScreen";
import Map from "./Map";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={TrainScreen} />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{ title: "Juna kartalla" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
