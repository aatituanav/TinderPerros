import React, { useState, useMemo } from "react";
import { BreedSelector, WriteBreed } from "./components/dogcomponents";
import {
  Image,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getBlurHash, uploadToFirebase } from "../../api/crudImages";
import { getBreed } from "../../api/predictbreed";
import styles from "../../styles/styles";
import { push, ref } from "firebase/database";
import { database } from "../../../firebase";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";
import { manipulateAsync } from "expo-image-manipulator";
import { putDog } from "../../api/crudDogs";
import { useTheme } from "../../styles/ThemeContext";

const DogForm = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [breedName, setBreedName] = useState("");
  const [breedId, setBreedId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [blurHash, setBlurHash] = useState(null);
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
  const { isDarkTheme } = useTheme();

  const resetData = () => {
    setImage(null);
    setUrlImage("");
    setBreedId("");
    setBreedId("");
    setBlurHash(null);
    setBreedName("");
    setUploading(false);
    setNameImageFirestore("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
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
          { compress: 0.4 }
        );
        setImage(manipResult.uri);
        setUploading(true);
        let nameTemp = null;
        //la comparacion es por que no puedo acceder al estado directamente en el mismo metodo cuando lo cambio

        if (nameImageFirestore == "") {
          nameTemp = global.userAuth.uid + `_` + new Date();
          setNameImageFirestore(nameTemp);
        }
        const downloadUrl = await uploadToFirebase(
          manipResult.uri,
          `dogsImages/` +
            (nameImageFirestore == "" ? nameTemp : nameImageFirestore)
        );
        setUrlImage(downloadUrl);
        getBlurHash(downloadUrl).then((response) => {
          console.log(response.blurHash);
          setBlurHash(response.blurHash);
        });
        const breeds = await getBreed(downloadUrl);
        setBreedsList(breeds.breed);
        setPunctuationList(breeds.score);
        setDialogVisible(true);
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
        setBreedName,
        isDarkTheme
      );
  }, [dialogVisible, breedsList, punctuationList]);

  const handlePetUpload = () => {
    const writeData = async () => {
      setUploadingForm(true);
      try {
        putDog(
          global.userAuth.uid,
          name,
          birthdate,
          description,
          urlImage,
          breedName,
          breedId,
          blurHash
        ); // guarda en firebase
        resetData();
        setCanUpload(false);
        setDescription("");
        setBirthdate("");
        setName("");
        setUploadingForm(false);
        navigation.navigate("DogsPublishedMain"); // Navega a la otra pestaña
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    writeData();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginVertical: 100,
          }}
        >
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
            disabled={!canUpload || uploadingForm || blurHash == null}
            onPress={() => {
              handlePetUpload();
            }}
          >
            Publicar
          </Button>
          {BreedSelectorMemo()}
          {WriteBreedMemo()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DogForm;
