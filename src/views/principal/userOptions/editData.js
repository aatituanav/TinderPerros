import React, { useState,useEffect } from "react";
import { Image, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getBlurHash, uploadToFirebase } from "../../../api/crudImages";
import { TextInput, Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "react-native-paper-dropdown";
import { manipulateAsync } from "expo-image-manipulator";
import styles from "../../../styles/styles";
import { putUser } from "../../../api/crudusers";
//import { getDogsUnviewed } from "../../api/crudDogs";

const UserData = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [idnumber, setIdNumber] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  const [uploadingForm, setUploadingForm] = useState(false);
  const [gender, setGender] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [blurHash, setBlurHash] = useState(null);

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


  useEffect(() => {
   setName(
  global.userData.name
   )
  }, []);

  const resetData = () => {
    setImage("");
    setName("");
    setIdNumber("");
    setUrlImage(null);
    setBlurHash(null);
    setGender("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const manipResult = await manipulateAsync(
          imageUri,
          [
            {
              resize: {
                height: 600,
              },
            },
          ],
          { compress: 0.5 }
        );
        setImage(manipResult.uri);
        const downloadUrl = await uploadToFirebase(
          manipResult.uri,
          `userImages/` + global.userAuth.uid
        );
        setUrlImage(downloadUrl);
        /*getBlurHash(downloadUrl).then((response) => {
          setBlurHash(response.blurHash);
        });*/
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserUpload = () => {
    const writeData = async () => {
      setUploadingForm(true);
      try {
        putUser(
          global.userAuth.uid,
          name,
          gender,
          urlImage,
          idnumber,
          blurHash
        );

        global.userData = {
          uid: global.userAuth.uid,
          name: name,
          gender: gender,
          urlImage: urlImage,
          idnumber: idnumber,
          blurHash: blurHash,
        };
        await AsyncStorage.setItem("userData", JSON.stringify(global.userData));
        setUploadingForm(false);
        resetData();
        //navigation.navigate("Principal"); // Navega a la otra pestaña
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
    <View style={styles.container}>
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
          style={styles.ufr_dropdown}
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
        disabled={uploadingForm || blurHash == null || urlImage == null}
        onPress={handleUserUpload}
      >
        Finalizar Registro
      </Button>
    </View>
  );
};

export default UserData;
