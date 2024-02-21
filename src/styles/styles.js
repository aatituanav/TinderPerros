import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttons: {
    width: "80%",
    margin: 3,
  },
  centerContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
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
});

export default styles;
