import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { updateDogsDismissed, updateDogsSelected } from "../../api/crudDogs";
import { getMissingSelectingDogs } from "../../utils/utils";

const Emparejamiento = () => {
  const [petList, setPetList] = useState([]);
  const [petsSelected, setPetsSelected] = useState(
    global.userData.dogsSelected ?? []
  );
  const [petsDismmised, setPetsDismmised] = useState(
    global.userData.dogsDismissed ?? []
  );

  // Simulación de datos de mascotas
  useEffect(() => {
    retrieveDogs();
  }, []);

  const selectPet = () => {
    //codigo para hacer match
    dogsCopy = [...petList];
    const dogSelected = dogsCopy.shift();
    const petSelectedCopy = [...petsSelected];
    petSelectedCopy.push(dogSelected);
    setPetsSelected(petSelectedCopy);
    setPetList(dogsCopy);
    updateDogsSelected(global.userAuth.uid, petSelectedUid);
  };

  const dismissPet = () => {
    //codigo para rechazar
    dogsCopy = [...petList];
    const dogSelected = dogsCopy.shift();
    const petDismissedCopy = [...petsDismmised];
    petDismissedCopy.push(dogSelected);
    setPetsDismmised(petDismissedCopy);
    setPetList(dogsCopy);
    updateDogsDismissed(global.userAuth.uid, petDismissedCopy);
  };

  const retrieveDogs = async () => {
    const filteredDogList = getMissingSelectingDogs(
      global.dogsList,
      petsSelected,
      petsDismmised
    );
    setPetList(filteredDogList);
  };

  return (
    <View style={styles.container}>
      {petList.length > 0 ? (
        <View style={styles.petCard}>
          <Image
            source={{
              uri: petList[0].urlImage,
            }}
            style={styles.petImage}
          />
          <Text style={styles.petName}>{petList[0].name}</Text>
          <Text style={styles.petDetails}>{petList[0].breedName}</Text>
          <Text style={styles.petDetails}>{petList[0].description}</Text>
        </View>
      ) : (
        <View>
          <Text>No hay mascotas disponibles</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={dismissPet}
        >
          <Text style={styles.buttonText}>No me gusta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={selectPet}
        >
          <Text style={styles.buttonText}>Me gusta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  petCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  petDetails: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Emparejamiento;
