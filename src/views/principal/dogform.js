import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../api/crudImages";
import { getBreed } from "../../api/predictbreed";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";

const DogForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [breed, setBreed] = useState("");
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [canUpload, setCanUpload] = useState(false);

  const resetData = () => {
    setImage(null);
    setUrlImage("");
    setBreed("");
    setUploading(false);
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
        const downloadUrl = await uploadToFirebase(imageUri, `dogsImages/name`);
        setUrlImage(downloadUrl);
        const breed = await getBreed(downloadUrl);
        setBreed(breed);
        setUploading(false);
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
      {image && !uploading && (
        <>
          <Text variant="titleLarge">Raza Detectada</Text>
          <Text variant="titleLarge">{global.breeds[breed]}</Text>
        </>
      )}
      {uploading && (
        <View>
          <Text variant="titleLarge">Analizando Imagen</Text>
          <ActivityIndicator size="large" animating={true} />
        </View>
      )}
      <TextInput
        style={styles.buttons}
        label="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.buttons}
        label="Año de nacimiento"
        value={birthdate}
        onChangeText={setBirthdate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.buttons}
        multiline
        placeholder="Cuentanos sobre tu mascota"
        value={description}
        onChangeText={setDescription}
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

export default DogForm;
