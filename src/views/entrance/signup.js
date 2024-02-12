import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../../../firebase";
import styles from "../../styles/styles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Signup = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleCreateAccount = async () => {
    console.log(user, pass);

    if (pass != confirmPass) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(auth, user, pass);
      const userJson = response.user.toJSON();
      await AsyncStorage.setItem("user", JSON.stringify(userJson));
      navigation.navigate("Principal");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.login}>
      <TextInput
        style={styles.buttons}
        label="Correo"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.buttons}
        label="Contraseña"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TextInput
        style={styles.buttons}
        label="Confirmar contraseña"
        secureTextEntry
        value={confirmPass}
        onChangeText={setConfirmPass}
      />
      <Button
        style={styles.buttons}
        icon="login"
        mode="contained"
        onPress={handleCreateAccount}
      >
        Crear Cuenta
      </Button>
    </View>
  );
};

export default Signup;
