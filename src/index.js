import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Principal from "./views/principal/principal";
import { NavigationContainer } from "@react-navigation/native";
import AuthForm from "./views/entrance/authform";
import UserFormRegister from "./views/entrance/userformregister";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="AuthForm"
          options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
          component={AuthForm}
        />
        <Stack.Screen
          name="Principal"
          options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
          component={Principal}
        />
        <Stack.Screen
          name="UserFormRegister"
          options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
          component={UserFormRegister}
        />
      </Stack.Navigator>
    </View>
  );
}
