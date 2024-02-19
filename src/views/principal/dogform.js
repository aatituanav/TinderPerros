import React, { useState, useEffect, useMemo } from "react";
import { BreedSelector, WriteBreed } from "./components/dogcomponents";
import { Image, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../api/crudImages";
import { getBreed } from "../../api/predictbreed";
import styles from "../../styles/styles";
import { push, ref } from "firebase/database";
import { database } from "../../../firebase";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";

const DogForm = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [breedName, setBreedName] = useState("");
  const [breedId, setBreedId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingForm, setUploadingForm] = useState(false);
  const [description, setDescription] = useState("");
  const [canUpload, setCanUpload] = useState(false);
  const [breedsList, setBreedsList] = useState([]);
  const [punctuationList, setPunctuationList] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogWriteVisible, setDialogWriteVisible] = useState(false);
  const [nameImageFirestore, setNameImageFirestore] = useState("");

  //oculta el dialogo para seleccionar las razas detectadas
  const hideDialog = () => setDialogVisible(false);
  const hideWriteDialog = () => setDialogWriteVisible(false);
  const showWriteDialog = () => setDialogWriteVisible(true);

  const resetData = () => {
    setImage(null);
    setUrlImage("");
    setBreedId("");
    setBreedId("");
    setBreedName("");
    setUploading(false);
    setNameImageFirestore("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        setUploading(true);
        let nameTemp = null;
        if (nameImageFirestore == "") {
          console.log(global.userAuth);
          console.log("se crea un nombre para la imagen");
          nameTemp = global.userAuth.uid + `_` + new Date();
          setNameImageFirestore(nameTemp);
        }
        //la comparacion es por que no puedo acceder al estado directamente en el mismo metodo cuando lo cambio
        const downloadUrl = await uploadToFirebase(
          imageUri,
          `dogsImages/` +
            (nameImageFirestore == "" ? nameTemp : nameImageFirestore)
        );
        setUrlImage(downloadUrl);
        const breeds = await getBreed(downloadUrl);
        setBreedsList(breeds.breed);
        setPunctuationList(breeds.score);
        //calculo la suma de las puntuaciones para ver si se detecto una mascota o no
        const suma = breeds.score.reduce(
          (acumulador, valorActual) => acumulador + valorActual,
          0
        );

        if (suma < 0.1) {
          Alert.alert("No se detectó ningún perro");
        } else {
          setDialogVisible(true);
        }
        setUploading(false);
        setCanUpload(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const WriteBreedMemo = useMemo(() => {
    return () =>
      WriteBreed(
        dialogWriteVisible,
        breedName,
        hideDialog,
        hideWriteDialog,
        setBreedName
      );
  }, [breedName, dialogWriteVisible]);

  const BreedSelectorMemo = useMemo(() => {
    return () =>
      BreedSelector(
        dialogVisible,
        breedsList,
        punctuationList,
        hideDialog,
        showWriteDialog,
        setBreedId,
        setBreedName
      );
  }, [dialogVisible, breedsList, punctuationList]);

  const handlePetUpload = () => {
    const writeData = async () => {
      setUploadingForm(true);
      try {
        await push(ref(database, "dogsData"), {
          user: global.userAuth.uid,
          name: name,
          yearBirth: birthdate,
          description: description,
          urlImage: urlImage,
          breedName: breedName,
          breedId: breedId,
        });
        resetData();
        setCanUpload(false);
        setDescription("");
        setBirthdate("");
        setName("");
        setUploadingForm(false);
        navigation.navigate("DogsPublished"); // Navega a la otra pestaña
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    writeData();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        style={styles.buttons}
        icon="image"
        mode="contained"
        disabled={uploading || uploadingForm}
        onPress={() => {
          setCanUpload(false);
          pickImage();
          //console.log(name);
        }}
      >
        Cargar Imagen
      </Button>
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
        </>
      )}
      {image && !uploading && (
        <>
          <Text variant="titleLarge">Raza: </Text>
          <Text variant="titleLarge">
            {breedId == "" ? breedName : global.breeds[breedId]}
          </Text>
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
        icon="publish"
        mode="contained"
        loading={uploadingForm}
        disabled={!canUpload || uploadingForm}
        onPress={() => {
          handlePetUpload();
        }}
      >
        Publicar
      </Button>
      {BreedSelectorMemo()}
      {WriteBreedMemo()}
    </View>
  );
};

export default DogForm;
