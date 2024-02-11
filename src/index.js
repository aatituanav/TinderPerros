import { StyleSheet, View } from "react-native";
import DogForm from "./views/dogform";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import MatchView from "./views/matchview";
import UserForm from "./views/userform";
import Login from "./views/login";

const Tab = createMaterialBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login}/>
        <Tab.Screen name="UserForm" component={UserForm} />

        <Tab.Screen
          name="Home"
          component={DogForm}
          options={{
            tabBarLabel: "Inicio",
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
        <Tab.Screen name="Upload" component={MatchView} />
      </Tab.Navigator>
    </NavigationContainer>
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
