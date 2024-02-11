import React, { useState } from "react";
import { Image, View, Text, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../api/crudImages";
import { getBreed } from "../api/predictbreed";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

const Login = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/petmachlogo.png")}
      />
    </View>
  );
};

export default Login;
