import React, { useState } from "react";
import { Image, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../api/crudImages";
import { getBreed } from "../../api/predictbreed";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "react-native-paper-dropdown";
import styles from "../../styles/styles";
import { putUser } from "../../api/crudusers";

const UserFormRegister = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [idnumber, setIdNumber] = useState("");
  const [uploadingForm, setUploadingForm] = useState(false);
  const [gender, setGender] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const genderList = [
    {
      label: "Masculino",
      value: "Masculino",
    },
    {
      label: "Femenino",
      value: "Femenino",
    },
  ];

  const resetData = () => {
    setImage("");
    setName("");
    setIdNumber("");
    setGender("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserUpload = () => {
    const writeData = async () => {
      setUploadingForm(true);
      try {
        const downloadUrl = await uploadToFirebase(
          image,
          `userImages/` + global.userAuth.uid
        );
        putUser(global.userAuth.uid, name, gender, downloadUrl, idnumber);
        

        global.userData = {
          uid: global.userAuth.uid,
          name: name,
          gender: gender,
          urlImage: downloadUrl,
          idnumber: idnumber,
        };
        await AsyncStorage.setItem("userData", JSON.stringify(global.userData));
        setUploadingForm(false);
        resetData();
        navigation.navigate("Principal"); // Navega a la otra pestaña
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    if (gender == "" || idnumber == "" || name == "") {
      Alert.alert("Faltan datos");
    } else if (image == "") {
      Alert.alert("Se tiene que subir una imagen");
    } else {
      setUploadingForm(true);
      writeData();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Text variant="titleLarge" style={{ paddingVertical: 20 }}>
        Datos de Registro
      </Text>

      <Button
        style={styles.buttons}
        icon="image"
        mode="contained"
        onPress={() => {
          pickImage();
        }}
      >
        Cargar Imagen
      </Button>
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
        </>
      )}
      <TextInput
        style={styles.buttons}
        label="Nombres"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.buttons}
        label="Documento de Identidad"
        value={idnumber}
        onChangeText={setIdNumber}
      />

      <View style={styles.buttons}>
        <DropDown
          label={"Genero"}
          style={{ backgroundColor: "orange", width: 100 }}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={gender}
          setValue={setGender}
          list={genderList}
        />
      </View>

      <Button
        style={styles.buttons}
        icon="account"
        loading={uploadingForm}
        mode="contained"
        disabled={uploadingForm}
        onPress={handleUserUpload}
      >
        Finalizar Registro
      </Button>
    </View>
  );
};

export default UserFormRegister;
