import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { selectDog } from "../../api/crudDogs";
import { DISMISS_DOG, SELECT_DOG } from "../../constants/constants";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Emparejamiento = () => {
  const [petList, setPetList] = useState(null);

  useEffect(() => {
    setPetList(global.dogList);
  }, []);

  const selectPet = async (operation) => {
    //codigo para hacer match
    const wasSuccessful = await selectDog(
      global.userData,
      petList[0].uid,
      operation
    );
    if (wasSuccessful) {
      dogsCopy = petList.slice(1);
      setPetList(dogsCopy);
    }
  };

  return (
    <View style={styles.container}>
      {petList == null ? (
        <View>
          <Text variant="titleLarge">Cargando Datos...</Text>
          <ActivityIndicator size="large" animating={true} />
        </View>
      ) : petList.length === 0 ? (
        <>
          <Text>Por ahora no hay mascotas</Text>
          <FontAwesome6
            name="face-sad-tear"
            size={100}
            color="#000"
            style={{ marginRight: 0 }}
          />
        </>
      ) : (
        <>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => selectPet(DISMISS_DOG)}
            >
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={() => selectPet(SELECT_DOG)}
            >
              <Text style={styles.buttonText}>Adoptar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
