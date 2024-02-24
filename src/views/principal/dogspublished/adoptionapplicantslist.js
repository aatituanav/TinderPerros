import { Button, Divider, Text } from "react-native-paper";
import { BackHandler, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { getDogsAdoptionApplicantList } from "../../../api/crudDogs";
import styles from "../../../styles/styles";

export default function AdoptionAplicantsList({ navigation, route }) {
  const [usersApplingList, setUsersApplingList] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Aquí manejas el evento de retroceso para la ventana 1
        navigation.goBack();
        return true;
      }
    );

    getUsers = async () => {
      const { dogUid } = route.params;
      const dogs = await getDogsAdoptionApplicantList(dogUid);
      if (dogs) {
        const temp = Object.keys(dogs).map((key) => ({ ...dogs[key], key }));
        setUsersApplingList(temp);
      }
    };

    getUsers();
    return () => backHandler.remove();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.aal_component}>
          <Text>{item.name}</Text>
          <Text>{item.gender}</Text>
        </View>

        <Divider />
      </>
    );
  };

  return (
    <>
      <FlatList
        data={usersApplingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </>
  );
}
