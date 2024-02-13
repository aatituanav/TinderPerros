import React, { useState, useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';

const DogsPublished = () => {
  const [texto, setTexto] = useState("");

  // Utiliza useMemo para memoizar la creación de la función componente
  const crearComponente = useMemo(() => {
    // Retorna la función que crea el componente
    return () => componente(texto, setTexto);
  }, [texto]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Llama a la función memoizada para renderizar el componente */}
      {crearComponente()}
    </View>
  );
};

const componente = (texto, setTexto) => {
  return (
    <View>
      {console.log("se renderiza el componente")}
      <Text>Este es un componente aparte</Text>
      <TextInput
        label="Ingrese un texto"
        value={texto}
        onChangeText={setTexto}
      />
    </View>
  );
};

export default DogsPublished;


