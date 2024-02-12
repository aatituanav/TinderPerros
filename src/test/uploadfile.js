import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import aplicacion from '../firebase'
import { getDatabase, ref, set } from "firebase/database";


export default function UploadFile() {


  const writeUserData = () => {
    const db = getDatabase(aplicacion);
    set(ref(db, 'users/dfasdf'), {
      username: 'andres',
      email: 'asdfs@gmail.co',
      profile_picture: 'imageUrl'
    });
  }


  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
