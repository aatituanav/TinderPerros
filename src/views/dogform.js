import React, { useState } from "react";
import { Image, View, Text, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../api/crudImages";
import { getBreed } from "../api/predictbreed";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

const DogForm = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    setUploading(true);
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
        const downloadUrl = await uploadToFirebase(imageUri, "nomebre1");
        const a = await getBreed(downloadUrl);
        console.log(a);
        setUploading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AwesomeIcon
        name="home"
        size={20}
        color="#ffffff"
        style={{ marginRight: 5 }}
      />
      <Button title="Cargar Imagen" onPress={() => pickImage()} />
      {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </>
      )}
      {uploading && <ActivityIndicator />}
    </View>
  );
};

export default DogForm;
