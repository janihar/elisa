import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, FlatList, Text } from "react-native";
import Search from "./Search";
import TrainItem from "./TrainItem";

const TrainScreen = ({ navigation }) => {
  //Getting json from server which includes every latest train numbers
  const [trainNumbers, setTrainNumbers] = useState();
  const [didFound, setDidFound] = useState(true);

  //Fetch every latest trains
  const fetchTrains = async () => {
    const train = await fetch(
      "https://rata.digitraffic.fi/api/v1/train-locations/latest/"
    );
    const trainData = await train.json();
    setTrainNumbers(trainData);
  };

  //Specific train fetch
  const fetchSpecificTrain = async trainID => {
    //Fetching every latest train
    const train = await fetch(
      "https://rata.digitraffic.fi/api/v1/train-locations/latest/" + trainID
    );
    const trainData = await train.json();
    if (trainData.length === 0) {
      // If nothing is found then set DidFound false and show message to user
      setDidFound(false);
      setTrainNumbers(trainData);
    } else {
      //Train did found, no error message needed
      setDidFound(true);
      setTrainNumbers(trainData);
    }
  };

  //Component mounts for the very first time
  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <View style={styles.container}>
      <Search fetchTrain={fetchSpecificTrain} navigation={navigation} />

      {didFound === false && <Text>JUNAA EI LÖYTYNYT</Text>}

      <FlatList
        style={styles.list}
        data={trainNumbers}
        renderItem={({ item }) => <TrainItem trainNumber={item.trainNumber} navigation={navigation} />}
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
