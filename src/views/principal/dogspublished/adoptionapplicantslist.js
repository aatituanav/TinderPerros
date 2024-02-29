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
import { useTheme } from "../../../styles/ThemeContext";

export default function AdoptionAplicantsList({ navigation, route }) {
  const [usersApplingList, setUsersApplingList] = useState(null);
  const [userSelectedData, setUserSelectedData] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const [dogName, setDogName] = useState(false);
  const { isDarkTheme } = useTheme();

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
      const { dogUid, dogName } = route.params;
      setDogName(dogName);
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
  const HeaderComponent = () => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text variant="titleSmall">Personas que quieren a {dogName}</Text>
        <Divider bold />
      </View>
    );
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
    <View style={styles.container}>
      {usersApplingList == null ? (
        <>
          <Text variant="titleLarge">Cargando Datos...</Text>
          <ActivityIndicator size="large" animating={true} />
        </>
      ) : usersApplingList.length === 0 ? (
        <View style={styles.container}>
          <Text>Todavía no hay adoptantes.</Text>
          <FontAwesome6
            name="face-sad-tear"
            size={100}
            color={isDarkTheme ? "white" : "#3eb7b3"}
            style={{ marginRight: 0 }}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={usersApplingList}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            ListHeaderComponent={HeaderComponent}
            ListHeaderComponentStyle={styles.container}
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
