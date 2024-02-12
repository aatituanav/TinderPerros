import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const Emparejamiento = () => {
  const [petList, setPetList] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  // Simulación de datos de mascotas
  useEffect(() => {
    // Esto es solo un ejemplo de datos simulados
    const dummyPetList = [
      {
        id: 1,
        name: "Luna",
        species: "Dog",
        breed: "Labrador Retriever",
        image: require("../assets/petmachlogo.png"),
      },
      {
        id: 2,
        name: "Max",
        species: "Dog",
        breed: "Golden Retriever",
        image: require("../assets/petmachlogo.png"),
      },
      {
        id: 3,
        name: "Simba",
        species: "Cat",
        breed: "Persian",
        image: require("../assets/petmachlogo.png"),
      },
      // Agrega más mascotas según sea necesario
    ];
    setPetList(dummyPetList);
  }, []);

  const handleLike = () => {
    // Aquí puedes implementar la lógica para manejar el "Me gusta" de una mascota
    // Por ejemplo, puedes registrar el "Me gusta" en una base de datos o realizar alguna otra acción
    // Por ahora, simplemente avanzamos al siguiente animal en la lista
    setCurrentPetIndex(currentPetIndex + 1);
  };

  const handleDislike = () => {
    // Aquí puedes implementar la lógica para manejar el "No me gusta" de una mascota
    // Por ejemplo, puedes descartar la mascota de la lista o realizar alguna otra acción
    // Por ahora, simplemente avanzamos al siguiente animal en la lista
    setCurrentPetIndex(currentPetIndex + 1);
  };

  if (petList.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay mascotas disponibles.</Text>
      </View>
    );
  }

  if (currentPetIndex >= petList.length) {
    return (
      <View style={styles.container}>
        <Text>No hay más mascotas disponibles.</Text>
      </View>
    );
  }

  const currentPet = petList[currentPetIndex];

  return (
    <View style={styles.container}>
      <View style={styles.petCard}>
        <Image source={currentPet.image} style={styles.petImage} />
        <Text style={styles.petName}>{currentPet.name}</Text>
        <Text style={styles.petDetails}>
          {currentPet.species} - {currentPet.breed}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={handleDislike}
        >
          <Text style={styles.buttonText}>No me gusta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={handleLike}
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
