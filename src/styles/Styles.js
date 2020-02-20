import { StyleSheet, Dimensions } from "react-native";
export default StyleSheet.create({
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
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 10
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
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center"
  },
  button: {
    fontSize: 20,
    width: Dimensions.get("window").width / 2,
    borderRadius: 25,
    color: "#64B82C"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
