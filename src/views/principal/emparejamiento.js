import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { selectDog } from "../../api/crudDogs";
import { DISMISS_DOG, SELECT_DOG } from "../../constants/constants";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import styles from "../../styles/styles";
import { Image } from "expo-image";

const Emparejamiento = () => {
  const [petList, setPetList] = useState(null);

  useEffect(() => {
    console.log("se renderiza Emparejamiento");
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
          <View style={styles.e_petCard}>
            <Image
              style={styles.e_petImage}
              source={petList[0].urlImage}
              placeholder={petList[0].blurHash}
              transition={400}
            />
            <Text style={styles.e_petName}>{petList[0].name}</Text>
            <Text style={styles.e_petDetails}>{petList[0].breedName}</Text>
            <Text style={styles.e_petDetails}>{petList[0].description}</Text>
          </View>
          <View style={styles.e_buttonContainer}>
            <TouchableOpacity
              style={[styles.e_button, { backgroundColor: "#FF9E9E" }]}
              onPress={() => selectPet(DISMISS_DOG)}
            >
              <Text style={styles.e_buttonText}>Siguiente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.e_button, { backgroundColor: "#ABFF9E" }]}
              onPress={() => selectPet(SELECT_DOG)}
            >
              <Text style={styles.e_buttonText}>Adoptar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Emparejamiento;
