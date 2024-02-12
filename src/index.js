import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Principal from "./views/principal/principal";
import { NavigationContainer } from "@react-navigation/native";
import MainEntrance from "./views/entrance/mainentrance";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
          component={MainEntrance}
        />
        <Stack.Screen
          name="Principal"
          options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
          component={Principal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
