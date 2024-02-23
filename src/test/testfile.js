import { Button } from "react-native-paper";
import { View } from "react-native";
import styles from "../styles/styles";

import { getDogsPublishedByUserUID } from "../api/crudDogs";

export default function TestFile() {
  const probar = async () => {
    //getMissingSelectingDogs();
    const a = await getDogsPublishedByUserUID();
  };

  return (
    <View style={styles.login}>
      <Button mode="contained" style={styles.buttons} onPress={probar}>
        Probar
      </Button>
    </View>
  );
}


