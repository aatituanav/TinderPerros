import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../styles/styles";
import { auth } from "../../../../firebase";
import { useTheme } from "../../../styles/ThemeContext";

const UserOptions = ({ navigation }) => {
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("userAuth");
      await AsyncStorage.removeItem("userData");
      global.userData = null;
      global.userAuth = null;
      await signOut(auth);
      navigation.navigate("AuthForm");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };
  const editData = () => {
    navigation.navigate("UserOptionMain");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        style={styles.buttons}
        icon="dog"
        mode="contained"
        onPress={() => {
          navigation.navigate("DogForm");
        }}
      >
        Registrar Mascota
      </Button>
      <Button
        style={styles.buttons}
        icon="lead-pencil"
        mode="contained"
        onPress={editData}
      >
        Editar datos de usuario
      </Button>
      <Button
        style={styles.buttons}
        icon={isDarkTheme ? "white-balance-sunny" : "moon-waning-crescent"}
        mode="contained"
        onPress={toggleThemeType}
      >
        {isDarkTheme ? "Modo Claro" : "Modo oscuro"}
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
