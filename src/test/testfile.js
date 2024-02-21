import { Button } from "react-native-paper";
import { View } from "react-native";
import styles from "../styles/styles";
import { database } from "../../firebase";
import {
  child,
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { setUsersListbyDog } from "../api/crudDogs";

export default function TestFile() {
  const probar = async () => {
    const users = [
      "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      "2h2gzPFV3wb1zCI2ytIPdfDIgfE3",
      "9e9Q0OSLp4XsXP174N3Yh4VVDo53",
      "oz0olcwZKVgRNw6977vHezFTUon1",
    ];

    setUsersListbyDog();
  };

  return (
    <View style={styles.login}>
      <Button mode="contained" style={styles.buttons} onPress={probar}>
        Probar
      </Button>
    </View>
  );
}
