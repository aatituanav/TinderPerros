import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { getDogsPublishedByUserUID } from "../../../api/crudDogs";
import styles from "../../../styles/styles";
import {
  ActivityIndicator,
  Divider,
  Menu,
  TouchableRipple,
} from "react-native-paper";

const DogsPublishedData = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [dogSelected, setDogSelected] = useState("");
  const [dogsList, setDogsList] = useState(null);
  const [dogsName, setDogsName] = useState(null);

  useEffect(() => {
    console.log("se renderiza DogsPublishedData");
    getDogsPublishedByUserUID(global.userAuth.uid, setDogsList);
  }, []);

  const openMenu = () => setShowMenu(true);

  const closeMenu = () => setShowMenu(false);

  const onIconPress = (event) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={(e) => {
          setDogSelected(item.uid);
          setDogsName(item.name);
          onIconPress(e);
        }}
      >
        <>
          <View
            style={{
              margin: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <Image
              style={styles.dp_imageinList}
              source={item.urlImage}
              placeholder={item.blurHash}
              transition={1000}
            />
            <View style={styles.dp_datatext_container}>
              <Text>Nombre: {item.name}</Text>
              <Text>Raza: {item.breedName}</Text>
              <Text>Año de nacimiento: {item.yearBirth}</Text>
            </View>
          </View>
          <Divider />
        </>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.container}>
      {dogsList == null ? (
        <View style={styles.container}>
          <Text variant="titleLarge">Cargando Datos...</Text>
          <ActivityIndicator size="large" animating={true} />
        </View>
      ) : dogsList.length === 0 ? (
        <View style={styles.container}>
          <Text>No has publicado ninguna mascota</Text>
          <FontAwesome6
            name="face-sad-tear"
            size={100}
            color="#000"
            style={{ marginRight: 0 }}
          />
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <FlatList
            data={dogsList}
            renderItem={renderItem}
            keyExtractor={(item) => item.uid}
          />
          <Menu visible={showMenu} onDismiss={closeMenu} anchor={menuAnchor}>
            <Menu.Item
              onPress={(a) => {
                closeMenu();
                navigation.navigate("AdoptionAplicantsList", {
                  dogUid: dogSelected,
                  dogName: dogsName,
                });
              }}
              title="Examinar Solicitantes"
              leadingIcon="clipboard-list"
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title="Editar Datos"
              leadingIcon="lead-pencil"
            />
          </Menu>
        </View>
      )}
    </View>
  );
};

export default DogsPublishedData;
