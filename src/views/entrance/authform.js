import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Alert, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./login";
import Signup from "./signup";
import { Button, Text } from "react-native-paper";
import styles from "../../styles/styles";

import { useNavigation } from "@react-navigation/native";
import { getUser } from "../../api/crudusers";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { getDogs } from "../../api/crudDogs";

const MAIN = 0;
const LOGIN = 1;
const SIGNUP = 2;

const AuthForm = () => {
  const [mainState, setMainState] = useState(0);
  const navigation = useNavigation();

  const entrar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        userAuth = await AsyncStorage.getItem("userAuth");

        global.userAuth = JSON.parse(userAuth);

        if (global.userAuth != null) {
          const userData = await getUser(global.userAuth.uid);
          if (userData == null) {
            await AsyncStorage.removeItem("userAuth");
            global.userAuth = null;
            await signOut(auth);
          } else {
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            global.userData = userData;
            navigation.navigate("Principal");
          }
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    fetchuser();
    retrieveDogs();
  }, []);

  const retrieveDogs = async () => {
    const dogscontent = await getDogs();
    let dogsList = [];
    for (let dogKey in dogscontent) {
      dogsList.push(dogscontent[dogKey]);
    }
    global.dogsList = dogsList;
  };

  /*useEffect(() => {
    const backAction = () => {
      // Aquí puedes realizar las acciones que desees cuando el usuario presione el botón de retroceso
      setMainState(MAIN);
    };
    // Suscribirse al evento de retroceso del dispositivo
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    // Limpiar el efecto al desmontar el componente
    return () => backHandler.remove();
  }, []);*/

  const handleButtonPress = (state) => {
    // Cambiar el estado principal
    console.log(`se cambia el estado por ${state}`);
    setMainState(state);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 3,
        }}
      >
        <Image source={require("../../assets/petmachlogo.png")} />
      </View>
      {mainState === MAIN && (
        <>
          <View
            style={{
              flexDirection: "column-reverse",
              alignItems: "center",
              flex: 2,
              marginBottom: 20,
            }}
          >
            <Button
              icon="login"
              mode="text"
              onPress={() => {
                handleButtonPress(2);
              }}
            >
              Crear Cuenta
            </Button>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require("../../assets/googleicon.png")}
                    style={styles.icons}
                  />
                )}
              ></Button>
              <Button
                onPress={() => {
                  handleButtonPress(1);
                }}
                icon={() => (
                  <Image
                    source={require("../../assets/emailicon.png")}
                    style={styles.icons}
                  />
                )}
              />
            </View>
          </View>
        </>
      )}
      {mainState === LOGIN && (
        <>
          <Login goBack={(state) => handleButtonPress(state)} />
        </>
      )}
      {mainState === SIGNUP && (
        <>
          <Signup goBack={(state) => handleButtonPress(state)} />
        </>
      )}
    </View>
  );
};

export default AuthForm;
