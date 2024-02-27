import { Dimensions, StyleSheet } from "react-native";

const dimensions = Dimensions.get("window");
const imageWidth = dimensions.width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "80%",
    margin: 2,
  },
  login: {
    alignItems: "center",
    width: "100%",
    marginVertical: 40,
  },
  icons: {
    width: 50,
    height: 50,
  },
  breedDialogListContainer: {
    flexDirection: "column",
  },
  breedDialogListButton: {
    width: "100%",
    marginVertical: 5,
  },
  image: { width: 300, height: 300, marginVertical: 10 },

  dp_imageinList: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    borderWidth: 3,
    borderColor: "gray", // Color del borde rojo
  },

  dp_datatext_container: {
    justifyContent: "center",
  },

  aal_component: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },

  e_petCard: {
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  e_petImage: {
    height: imageWidth,
    width: imageWidth,
    borderRadius: 10,
    marginBottom: 10,
  },
  e_petName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  e_petDetails: {
    fontSize: 16,
    color: "#666",
  },
  e_buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  e_button: {
    width: 100,
    height: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  e_buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  ufr_dropdown: {
    backgroundColor: "orange",
    width: 100,
  },
});

export default styles;
