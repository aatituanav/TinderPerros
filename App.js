import "react-native-gesture-handler";
import Index from "./src";
import { AppRegistry, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { expo as expo } from "./app.json";
import breeds from "./src/assets/breeds.json"; // Importa el archivo JSON
import * as SplashScreen from "expo-splash-screen";
import TestFile from "./src/test/testfile";
import { useCallback, useEffect, useState } from "react";

AppRegistry.registerComponent(expo.name, () => App);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        global.breeds = breeds;

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
    <PaperProvider>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Index />
      </View>
    </PaperProvider>
  );
}
//
