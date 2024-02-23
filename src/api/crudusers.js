import { ref, onValue, push, set, get } from "firebase/database";
import { database } from "../../firebase";

const getUser = (uid) => {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(database, "users/" + uid);
    //le cambie por get, y ya no funcionó, revisar esa wea
    onValue(
      starCountRef,
      (snapshot) => {
        resolve(snapshot.val()); // Resolvemos la promesa con los datos
      },
      (error) => {
        reject(error); // Manejamos cualquier error
      }
    );
  });
};

const putUser = async (uid, name, gender, downloadUrl, idnumber) => {
  const a = await set(ref(database, "users/" + uid), {
    uid: uid,
    name: name,
    gender: gender,
    urlImage: downloadUrl,
    idnumber: idnumber,
  });
};
export { getUser, putUser };
