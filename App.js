import "react-native-gesture-handler";
import Index from "./src";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { expo as expo } from "./app.json";
import breeds from "./src/assets/breeds.json"; // Importa el archivo JSON
AppRegistry.registerComponent(expo.name, () => App);

global.breeds = breeds;

export default function App() {
  return (
    <PaperProvider>
      <Index />
    </PaperProvider>
  );
}

