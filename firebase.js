import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  indexedDBLocalPersistence,
} from "firebase/auth";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
  MEASUREMENTID,
} from "@env";

// Funciones necesarias para inicializar firebase

// archivo de configuracion con las credenciales que me voy a conectar a firebase
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};
// Inicializo Firebase

const aplicacion = initializeApp(firebaseConfig);

console.log(Platform.OS);
const auth = initializeAuth(aplicacion, {
  persistence:
    Platform.OS === "web"
      ? indexedDBLocalPersistence
      : getReactNativePersistence(ReactNativeAsyncStorage),
});

export { aplicacion, auth };
