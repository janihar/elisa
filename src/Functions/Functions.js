/**
 * Fetch active trains
 */
export const fetchTrains = async () => {
  try {
    const train = await fetch(
      "https://rata.digitraffic.fi/api/v1/train-locations/latest/"
    );
    const trainData = await train.json();

    return trainData;
  } catch (error) {
    alert(error)
  }
};

/**
 * Fetch specific train by its train number
 * @param {number} trainID
 */
export const fetchSpecificTrain = async trainID => {
  let fetchURL;

  //User only gave a number
  if (isNumber(trainID)) {
    fetchURL =
      "https://rata.digitraffic.fi/api/v1/train-locations/latest/" + trainID;
  } else {
    //Check if its url
    if (checkURL(trainID)) {
      //URL is valid
      fetchURL = trainID;
    } else if (trainID === undefined || trainID === "") {
      //given trainID is empty
      fetchURL = "https://rata.digitraffic.fi/api/v1/train-locations/latest/";
    } else {
      //URL is invalid
      return [];
    }
  }

  //If URL doesnt return anything catch error
  try {
    const train = await fetch(fetchURL);

    const trainData = await train.json();

    //Given url is valid but given parameter not
    if (trainData.code === "PARAMETER_WRONG_TYPE") {
      return [];
    }

    return trainData;
  } catch (error) {
    return [];
  }
};

/**
 * If url is a valid api rata.digitraffic request
 * @param {string} URL
 */
export const checkURL = URL => {
  var pattern = /^((http|https|):\/\/)rata.digitraffic.fi/;
  if (!pattern.test(URL)) {
    return false;
  }

  return URL;
};

/**
 * Check if given parameter is a number
 * @param {*} number
 */
export const isNumber = number => {
  let integer = parseInt(number, 10);
  return Number.isFinite(integer);
};
