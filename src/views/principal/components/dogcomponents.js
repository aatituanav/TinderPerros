import React from "react";
import { Image, View, StyleSheet } from "react-native";
import styles from "../../../styles/styles";
import {
  TextInput,
  Text,
  Button,
  Portal,
  Dialog,
  ProgressBar,
  MD3Colors,
} from "react-native-paper";

//primer componente el cual muestra la lista con las razas detectadas
const WriteBreed = (
  dialogWriteVisible,
  breedName,
  hideDialog,
  hideWriteDialog,
  setBreedName
) => {
  return (
    <Portal>
      <Dialog visible={dialogWriteVisible} onDismiss={hideWriteDialog}>
        <Dialog.Title>
          Razas Detectadas <Dialog.Icon icon="dog" />
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Ingrese la Raza"
            value={breedName}
            onChangeText={setBreedName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              hideDialog();
              hideWriteDialog();
            }}
          >
            Continuar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

//segundo componente para mostrar un cuadro de texto para que el usuario ingrese manualmente la raza del perro

const BreedSelector = (
  dialogVisible,
  breedsList,
  punctuationList,
  hideDialog,
  showWriteDialog,
  setBreedId,
  setBreedName,
  isDarkTheme
) => {
  return (
    <Portal>
      <Dialog visible={dialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>
          Razas Detectadas <Dialog.Icon icon="dog" />
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Elija una raza</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.breedDialogListContainer}>
          {punctuationList.map((element, index) => {
            return (
              <View style={styles.breedDialogListButton} key={index}>
                <Button
                  onPress={() => {
                    setBreedId(breedsList[index]);
                    setBreedName(global.breeds[breedsList[index]]);
                    hideDialog();
                  }}
                  mode="elevated"
                >
                  {global.breeds[breedsList[index]]}
                </Button>
                <ProgressBar
                  progress={element}
                  color={isDarkTheme ? "#3eb7b3" : "#efa350"}
                />
              </View>
            );
          })}
          <View style={styles.breedDialogListButton}>
            <Button onPress={showWriteDialog} mode="elevated">
              Otro
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { BreedSelector, WriteBreed };
