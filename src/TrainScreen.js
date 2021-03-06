import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import Search from "./Search";
import TrainItem from "./TrainItem";
import { fetchTrains, fetchSpecificTrain } from "./Functions/Functions";
import styles from "../src/styles/Styles";
import LoadingIndicator from "./LoadingIndicator";

const TrainScreen = ({ navigation }) => {
  //Getting json from server which includes every latest train numbers
  const [trainNumbers, setTrainNumbers] = useState();
  //Whether user did found a active train or not
  const [didFound, setDidFound] = useState(true);
  //
  const [isLoading, setIsLoading] = useState(true);

  //Get specific train
  const getSpecificTrain = async trainID => {
    const trainData = await fetchSpecificTrain(trainID);
    setIsLoading(false);
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
    setIsLoading(false);
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
      {isLoading === false ? (
        <FlatList
          style={styles.list}
          data={trainNumbers}
          initialNumToRender={50}
          renderItem={({ item }) => (
            <TrainItem trainNumber={item.trainNumber} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <LoadingIndicator text={"Haetaan"} />
      )}
    </View>
  );
};

export default TrainScreen;
