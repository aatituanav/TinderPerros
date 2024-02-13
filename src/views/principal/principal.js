import { StyleSheet, View } from "react-native";
import DogForm from "./dogform";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import UserOptions from "./useroptions";
import Emparejamiento from "./emparejamiento";
import DogsPublished from "./dogsPublished";

const Tab = createMaterialBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Perros Publicados"
        component={DogsPublished}
        options={{
          tabBarLabel: "Mascotas Publicadas",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="dog"
              size={30}
              color="#000"
              style={{ marginRight: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Emparejamiento"
        component={Emparejamiento}
        options={{
          tabBarLabel: "Adoptar un Amigo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dog"
              size={30}
              color="#000"
              style={{ marginRight: 0 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={DogForm}
        options={{
          tabBarLabel: "Dar en Adopción",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="pets"
              size={30}
              color="#000"
              style={{ marginRight: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Options"
        component={UserOptions}
        options={{
          tabBarLabel: "Opciones",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="gear"
              size={30}
              color="#000"
              style={{ marginRight: 0 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
