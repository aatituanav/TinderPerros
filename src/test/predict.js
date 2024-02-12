import React, { useState } from "react";
import { Image, View, Text, Button, ActivityIndicator } from "react-native";

export default function Predict() {
  const peticion = async () => {
    const link =
      "https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal_recorte1.jpg";
    const api = "https://tinderperros-xz2a5u3iua-tl.a.run.app/api/predictbreed";


    const localapi = 'http://127.0.0.1:8080/api/predictbreed'

    try {
      const response = await fetch(localapi, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: link,
        }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    </View>
  );
}
