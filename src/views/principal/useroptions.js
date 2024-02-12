import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/styles";

const UserOptions = () => {
  const navigation = useNavigation();

  const handleLogOut = async () => {
    try {
      const auth = getAuth();
      await AsyncStorage.removeItem("user");
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        style={styles.buttons}
        icon="dog"
        mode="contained"
        onPress={handleLogOut}
      >
        Registrar Mascota
      </Button>
      <Button
        style={styles.buttons}
        icon="logout"
        mode="contained"
        onPress={handleLogOut}
      >
        Cerrar Sesion
      </Button>
    </View>
  );
};

export default UserOptions;
