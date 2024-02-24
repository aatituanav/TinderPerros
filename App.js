import "react-native-gesture-handler";
import Index from "./src";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { expo as expo } from "./app.json";
import breeds from "./src/assets/breeds.json"; // Importa el archivo JSON
import TestFile from "./src/test/testfile";

AppRegistry.registerComponent(expo.name, () => App);

global.breeds = breeds;

export default function App() {
  return (
    <PaperProvider>
      <TestFile />
    </PaperProvider>
  );
}
