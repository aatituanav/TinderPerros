import { ref, onValue, push } from "firebase/database";
import { database } from "../../firebase";

const getUser = async (uid) => {
  const starCountRef = ref(database, "users/" + uid);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

const putUser = async (uid, name, gender, downloadUrl, idnumber) => {
  const a = await push(ref(database, "users/" + uid), {
    uid: uid,
    name: name,
    gender: gender,
    urlImage: downloadUrl,
    idnumber: idnumber,
  });
  console.log(a);
};
export { getUser, putUser };
