import React, { useState } from "react";
import { Image, View, Text, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../api/crudImages";
import { getBreed } from "../api/predictbreed";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

const Match = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Texto Chido</Text>
      <AwesomeIcon
        name="rocket"
        size={40}
        color="#000"
        style={{ marginRight: 5 }}
      />
    </View>
  );
};

export default Match;
