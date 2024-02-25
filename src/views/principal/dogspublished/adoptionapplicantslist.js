import {
  Divider,
  Text,
  ActivityIndicator,
  TouchableRipple,
  Portal,
  Dialog,
} from "react-native-paper";
import { BackHandler, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { getDogsAdoptionApplicantList } from "../../../api/crudDogs";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import styles from "../../../styles/styles";
import { getUser } from "../../../api/crudusers";
import { Image } from "expo-image";

const blurhash = "USI;6Tw^~p9uWXS$ogozFxE1-oRPxZRkNGoM";

export default function AdoptionAplicantsList({ navigation, route }) {
  const [usersApplingList, setUsersApplingList] = useState(null);
  const [userSelectedData, setUserSelectedData] = useState(null);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    console.log("se renderiza AdoptionAplicantsList");
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Aquí manejas el evento de retroceso para la ventana 1
        navigation.goBack();
        return true;
      }
    );

    const getUsers = async () => {
      const { dogUid } = route.params;
      const dogs = await getDogsAdoptionApplicantList(dogUid);
      if (dogs) {
        const temp = Object.keys(dogs).map((key) => ({ ...dogs[key], key }));
        setUsersApplingList(temp);
      } else {
        setUsersApplingList([]);
      }
    };

    getUsers();
    return () => backHandler.remove();
  }, []);

  const showUserSelected = async (userUid) => {
    setUserSelectedData(await getUser(userUid));
    setShowUser(true);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => {
          showUserSelected(item.key);
        }}
      >
        <>
          <View style={styles.aal_component}>
            <Text>{item.name}</Text>
            <Text>{item.gender}</Text>
          </View>
          <Divider />
        </>
      </TouchableRipple>
    );
  };

  return (
    <View>
      {usersApplingList == null ? (
        <>
          <Text variant="titleLarge">Cargando Datos...</Text>
          <ActivityIndicator size="large" animating={true} />
        </>
      ) : usersApplingList.length === 0 ? (
        <>
          <Text>No has publicado ninguna mascota</Text>
          <FontAwesome6
            name="face-sad-tear"
            size={100}
            color="#000"
            style={{ marginRight: 0 }}
          />
        </>
      ) : (
        <>
          <FlatList
            data={usersApplingList}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
          <Portal>
            <Dialog
              visible={showUser}
              onDismiss={() => {
                setShowUser(false);
                setUserSelectedData(null);
              }}
            >
              <Dialog.Title>
                Datos del Usuario <Dialog.Icon icon="account-star" />
              </Dialog.Title>
              <Dialog.Content style={{ alignItems: "center" }}>
                <Image
                  style={styles.e_petImage}
                  source={userSelectedData && userSelectedData.urlImage}
                  placeholder={userSelectedData && userSelectedData.blurHash}
                  contentFit="cover"
                  transition={1000}
                />
                <>
                  <Text>
                    Nombre: {userSelectedData && userSelectedData.name}
                  </Text>
                  <Text>
                    Sexo: {userSelectedData && userSelectedData.gender}
                  </Text>
                  <Text>
                    C.I: {userSelectedData && userSelectedData.idnumber}
                  </Text>
                </>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </>
      )}
    </View>
  );
}
