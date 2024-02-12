import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [seePass, setSeePass] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        "alvaro.andres1996@hotmail.com",
        "111111"
      );
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
        secureTextEntry={seePass}
        right={
          <TextInput.Icon
            icon={seePass ? "eye-off" : "eye"}
            onPress={() => setSeePass(!seePass)}
          />
        }
        value={pass}
        onChangeText={setPass}
      />
      <Button
        style={styles.buttons}
        icon="login"
        mode="text"
        onPress={handleLogin}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
};

export default Login;
