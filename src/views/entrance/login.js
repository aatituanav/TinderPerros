import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Alert, BackHandler } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../../api/crudusers";
import { getDogsUnviewed } from "../../api/crudDogs";

const Login = ({ goBack }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [seePass, setSeePass] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      //permite mostrar el formulario original (la vista original), es como retroceder xd
      goBack(0);
      return true; // Bloquea el retroceso
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const resetData = () => {
    setUser("");
    setPass("");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, user, pass);
      const userJsonAuth = response.user.toJSON();

      await AsyncStorage.setItem("userAuth", JSON.stringify(userJsonAuth));
      global.userAuth = userJsonAuth;
      const userData = await getUser(global.userAuth.uid);
      resetData();
      if (userData) {
        //traigo los perros cada vez que inicio sesión y almaceno los datos
        //persisto los datos que faltan y continúo
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        global.dogList = await getDogsUnviewed(userData.dogsSelected);
        global.userData = userData;
        navigation.navigate("Principal");
      } else {
        navigation.navigate("UserFormRegister");
      }
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
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
        loading={loading}
        onPress={handleLogin}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
};

export default Login;
