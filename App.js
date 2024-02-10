import Index from "./src";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";

export default function App() {
  return (
    <PaperProvider>
      <Index />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);
