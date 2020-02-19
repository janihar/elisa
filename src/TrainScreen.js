import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, FlatList, Text } from "react-native";
import Search from "./Search";
import TrainItem from "./TrainItem";
import { fetchTrains, fetchSpecificTrain } from "./Functions/Functions";

const TrainScreen = ({ navigation }) => {
  //Getting json from server which includes every latest train numbers
  const [trainNumbers, setTrainNumbers] = useState();
  //Whether user did found a active train or not
  const [didFound, setDidFound] = useState(true);

  //Get specific train
  const getSpecificTrain = async trainID => {
    const trainData = await fetchSpecificTrain(trainID);

    if (trainData.length === 0) {
      // If nothing is found then set DidFound false and show message to user
      setDidFound(false);
      setTrainNumbers(trainData);
      //return false
    } else {
      //Train did found, no error message needed
      setDidFound(true);
      setTrainNumbers(trainData);
    }
  };

  //Get active trains
  getTrains = async () => {
    const response = await fetchTrains();
    setTrainNumbers(response);
  };

  //Component mounts for the very first time
  useEffect(() => {
    getTrains();
  }, []);

  return (
    <View style={styles.container}>
      <Search fetchTrain={getSpecificTrain} navigation={navigation} />

      {didFound === false && <Text>JUNAA EI LÖYTYNYT</Text>}

      <FlatList
        style={styles.list}
        data={trainNumbers}
        initialNumToRender={50}
        renderItem={({ item }) => (
          <TrainItem trainNumber={item.trainNumber} navigation={navigation} />
        )}
        keyExtractor={item => item.trainNumber.toString()}
      />
    </View>
  );
};

export default TrainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    flex: 1,
    width: Dimensions.get("window").width / 1.5,
    marginHorizontal: 16,
    top: Dimensions.get("window").height / 10
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 100
  }
});
