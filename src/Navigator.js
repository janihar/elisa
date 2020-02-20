import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TrainScreen from "./TrainScreen";
import MapScreen from "./MapScreen";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={TrainScreen} options={{headerShown:false}} />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Juna kartalla" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
