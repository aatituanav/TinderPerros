import { createStackNavigator } from "@react-navigation/stack";
import UserData from "./editData";
import UserOptions from "./useroptions";
const Stack = createStackNavigator();

export default function UserOptionMain() {
  return (
    <Stack.Navigator initialRouteName="UserOptions"
    >
      <Stack.Screen
        name="UserData"
        options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
        component={UserData}
      />
      <Stack.Screen
        name="UserOptions"
        options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
        component={UserOptions}
      />
    </Stack.Navigator>
  );
}
