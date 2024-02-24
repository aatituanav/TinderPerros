import React, { useState } from "react";
import { Button, Divider, Text } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";

export default function TestFile() {
  const [usersApplingList, setUsersApplingList] = useState([
    {
      gender: "Masculino",
      key: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      name: "Andrés Tituana ",
      operation: true,
    },
    {
      gender: "Masculino",
      key: "9e9Q0OSLp4XsXP174N3Yh4VVDo53",
      name: "Andrés",
      operation: true,
    },
  ]);

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.aal_component}>
          <Text>{item.name}</Text>
          <Text>{item.gender}</Text>
        </View>

        <Divider />
      </>
    );
  };

  return (
    <>
      <FlatList
        data={usersApplingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </>
  );
}

const styles = StyleSheet.create({
  aal_component: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
});
