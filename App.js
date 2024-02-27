import "react-native-gesture-handler";
import Index from "./src";
import { AppRegistry, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { expo as expo } from "./app.json";
import breeds from "./src/assets/breeds.json"; // Importa el archivo JSON
import * as SplashScreen from "expo-splash-screen";
import TestFile from "./src/test/testfile";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "./src/api/crudusers";
import { getDogsUnviewed } from "./src/api/crudDogs";
import { ThemeContextProvider, useTheme } from "./src/styles/ThemeContext";

AppRegistry.registerComponent(expo.name, () => App);

SplashScreen.preventAutoHideAsync();
global.dev = true;
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { toggleThemeType, themeType, isDarkTheme } = useTheme();
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        if (global.dev) {
          global.breeds = breeds;
          userAuth = await AsyncStorage.getItem("userAuth");
          global.userAuth = JSON.parse(userAuth);
          if (global.userAuth) {
            global.userData = await getUser(global.userAuth.uid);
            global.dogList = await getDogsUnviewed(userData.dogsSelected);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Index />
      </View>
    </ThemeContextProvider>
  );
}
