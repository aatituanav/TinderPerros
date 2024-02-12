import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
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
const auth = initializeAuth(aplicacion, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { aplicacion, auth };
