import { createStackNavigator } from "@react-navigation/stack";
import DogsPublishedData from "./dogspublisheddata";
import AdoptionAplicantsList from "./adoptionapplicantslist";
const Stack = createStackNavigator();

export default function DogsPublishedMain() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DogsPublishedData"
        options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
        component={DogsPublishedData}
      />
      <Stack.Screen
        name="AdoptionAplicantsList"
        options={{ headerShown: false }} // Oculta el encabezado en esta pantalla
        component={AdoptionAplicantsList}
      />
    </Stack.Navigator>
  );
}
