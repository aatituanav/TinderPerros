import React, { useState } from "react";
import { Button, Divider, Text } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
import { encodePromise } from "../utils/utils";

export default function TestFile() {
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState(null);

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
        console.log(result.assets[0]);
        setUri(imageUri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getblur = async () => {
    //new Uint8ClampedArray()

  };

  return (
    <View style={styles.container}>
      <Button icon="login" mode="outlined" onPress={pickImage}>
        Subir Imagen
      </Button>
      <Button icon="login" mode="outlined" onPress={getblur}>
        generar Blur
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
