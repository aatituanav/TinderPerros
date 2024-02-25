import { BackHandler, StyleSheet, View } from "react-native";
import DogForm from "./dogform";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import UserOptionMain from "./userOptions/userOptionMain";
import Emparejamiento from "./emparejamiento";
import { useEffect } from "react";
import DogsPublishedMain from "./dogspublished/dogspublishedmain";
import { useNavigationState } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

export default function Principal() {
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const backAction = () => {
      //permite mostrar el formulario original (la vista original), es como retroceder xd

      console.log(navigationState.routes[0].name);

      return true; // Bloquea el retroceso
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator initialRouteName="DogForm">
      <Tab.Screen
        name="DogForm"
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
        name="DogsPublishedMain"
        component={DogsPublishedMain}
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
        name="userOptionMain"
        component={UserOptionMain}
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

