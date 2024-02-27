import React, { useState, useEffect } from "react";
import { Alert, View, BackHandler } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Modal,
  Text,
  Dialog,
} from "react-native-paper";
import { auth } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../../api/crudusers";
import { getDogsUnviewed } from "../../api/crudDogs";
import { resetPassword, verifyEmail } from "../../api/auth";
const Login = ({ goBack }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [seePass, setSeePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);
  const [dialogResetPassVisible, setDialogResetPassVisible] = useState(false);

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

  const showDialog = () => {
    setDialogResetPassVisible(true);
  };
  const hideDialog = () => {
    setDialogResetPassVisible(false);
  };

  const resetData = () => {
    setUser("");
    setPass("");
    setLoading(false);
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, user, pass);
      if (response.user.emailVerified) {
        const userJsonAuth = response.user.toJSON();
        await AsyncStorage.setItem("userAuth", JSON.stringify(userJsonAuth));
        global.userAuth = userJsonAuth;
        const userData = await getUser(global.userAuth.uid);
        if (userData) {
          //traigo los perros cada vez que inicio sesión y almaceno los datos
          //persisto los datos que faltan y continúo
          await AsyncStorage.setItem("userData", JSON.stringify(userData));
          global.dogList = await getDogsUnviewed(userData.dogsSelected);
          global.userData = userData;
          resetData();
          navigation.navigate("Principal");
        } else {
          navigation.navigate("UserFormRegister");
        }
      } else {
        Alert.alert(
          "No se ha verificado el email",
          "Se ha enviado un correo de verificación. Por favor, revisa tu bandeja de entrada, e inicia sesión nuevamente",
          [
            {
              text: "Aceptar",
              onPress: () => {
                setLoading(false);
              },
            },
            {
              text: "Enviar otro Correo de Verificación",
              onPress: () => {
                verifyEmail(), setLoading(false);
              },
            },
          ]
        );
      }
    } catch (error) {
      if ("Firebase: Error (auth/invalid-credential)." === error.message) {
        setShowResetPass(true);
      }
      Alert.alert(error.message);
      setLoading(false);
    }
  };

  const resetPass = () => {
    const action = resetPassword(user);
    if (action) {
      hideDialog();
      Alert.alert("Correo Enviado", "Por favor, revise su correo no deseado", [
        { text: "Aceptar" },
      ]);
      setShowResetPass(false);
    } else {
      Alert.alert(
        "ERROR",
        "No se ha podido enviar el correo, Intente nuevamente",
        [{ text: "Aceptar" }]
      );
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
      {showResetPass == true && (
        <Button
          style={styles.buttons}
          icon="account-key"
          mode="text"
          onPress={showDialog}
        >
          Olvidaste tu contraseña?
        </Button>
      )}
      <Portal>
        <Dialog visible={dialogResetPassVisible} onDismiss={hideDialog}>
          <Dialog.Title>Recuperar Clave</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Le llegará un correo de recuperacion al correo
            </Text>
            <TextInput
              label="Correo electrónico"
              value={user}
              onChangeText={setUser}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained-tonal" onPress={resetPass}>
              {" "}
              Enviar{" "}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Login;
