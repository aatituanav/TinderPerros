import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../api/crudImages";
import { getBreed } from "../../api/predictbreed";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const UserForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [idnumber, setIdNumber] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [canUpload, setCanUpload] = useState(false);
  const [gender, setGender] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    setImage(null);
    setUrlImage("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        setUploading(true);
        const downloadUrl = await uploadToFirebase(imageUri, `userImages/name`);
        setUploading(false);
        setUrlImage(downloadUrl);
        setCanUpload(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        style={styles.buttons}
        icon="home"
        mode="contained"
        onPress={() => {
          resetData();
          setCanUpload(false);
          pickImage();
        }}
      >
        Cargar Imagen
      </Button>
      {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </>
      )}
      {uploading && (
        <View>
          <Text variant="titleLarge">Cargando</Text>
          <ActivityIndicator size="large" animating={true} />
        </View>
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

      <DropDown
        style={styles.buttons}
        label={"Genero"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={gender}
        setValue={setGender}
        list={genderList}
      />
      <Button
        style={styles.buttons}
        icon="home"
        mode="contained"
        disabled={!canUpload}
        onPress={() => {
          setCanUpload(false);
        }}
      >
        Continuar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: "80%",
  },
});

export default UserForm;
