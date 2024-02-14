import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../../../firebase";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Signup = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const navigation = useNavigation();

  const clearData = () => {
    setUser("");
    setPass("");
    setConfirmPass("");
    setCreatingUser(false);
  };
  const handleCreateAccount = async () => {
    if (pass != confirmPass) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    try {
      setCreatingUser(true);
      const response = await createUserWithEmailAndPassword(auth, user, pass);
      const userJson = response.user.toJSON();
      await AsyncStorage.setItem("user", JSON.stringify(userJson));
      global.user = userJson;
      clearData();
      navigation.navigate("UserFormRegister");
    } catch (error) {
      Alert.alert(error.message);
      setCreatingUser(false);
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
        loading={creatingUser}
        mode="contained"
        onPress={handleCreateAccount}
      >
        Crear Cuenta
      </Button>
    </View>
  );
};

export default Signup;
