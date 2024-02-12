import { StyleSheet, View } from "react-native";
import DogForm from "./dogform";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import MainEntrance from "../entrance/mainentrance";
import UserOptions from "./useroptions";

const Tab = createMaterialBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DogForm}
        options={{
          tabBarLabel: "Dogform",
          tabBarIcon: ({ color, size }) => (
            <AwesomeIcon
              name="rocket"
              size={30}
              color="#000"
              style={{ marginRight: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen name="Options" component={UserOptions} />
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
