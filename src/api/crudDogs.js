import { child, get, push, ref, set, update } from "firebase/database";
import { database } from "../../firebase";

const getDogs = async () => {
  //obtiene todos los perros
  try {
    const snapshot = await get(child(database, `dogsData`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getDogsPublishedByUserUID = (userUid) => {
  const userDogs = [];
  //obtiene los perros que un usuario ha publicado
  // uid: permite filtar los perros por el usuario mediante uid
  //tecnicamente no hace una busqueda en la base, por que cuando cargo la aplicacion, ya se cargan datos de perros, solo tengo que filtrar
  for (let dogObjectKey in global.dogsList) {
    const tempDogObject = global.dogsList[dogObjectKey];
    if (tempDogObject.user == userUid) {
      userDogs.push(tempDogObject);
    }
  }
  return userDogs;
};

const putDog = async (
  userUid,
  name,
  birthdate,
  description,
  urlImage,
  breedName,
  breedId
) => {
  //crear registro de una mascota
  const reference = push(ref(database, "dogsData"), {
    user: userUid,
    name: name,
    yearBirth: birthdate,
    description: description,
    urlImage: urlImage,
    breedName: breedName,
    breedId: breedId,
  });
  const a = await update(ref(database, "dogsData/" + reference.key), {
    uid: reference.key,
  });
};

/*const putDogsSelected = async () => {
  const a = await set(ref(database, "users/" + uid), {
    uid: uid,
    name: name,
    gender: gender,
    urlImage: downloadUrl,
    idnumber: idnumber,
  });
};*/

const updateDogsDismissed = async (userUid, listDogsDismissed) => {
  //agrega o actualiza la lista de perros rechazados por el usuario
  const a = await update(ref(database, `users/${userUid}`), {
    dogsDismissed: listDogsDismissed,
  });
};

const selectDog = async (userUid, petUid) => {
  //registra match de una mascota
  //userUid: uid del usuario que dio el match
  //petUid: uid de la mascota a la cual se le dio match
  const updates = {};
  updates["/users/" + userUid + "/dogsSelected/" + petUid] = true;
  updates["/dogSelectedByUser/" + petUid + "/" + userUid] = true;
  update(ref(db), updates)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return null;
    });
};

const updateDogsSelected = async (userUid, listDogsSelected) => {
  //agrega el uid del perro seleccionado
  const a = await update(ref(database, `users/${userUid}`), {
    dogsSelected: listDogsSelected,
  });
};

const setUsersListbyDog = async (dogUid, userUid) => {
  //actualizar la lista de personas que hicieron match con determinada mascota
  const newPostKey = push(child(ref(database), "users")).key;
  console.log(newPostKey);
};

export {
  getDogs,
  updateDogsDismissed,
  updateDogsSelected,
  putDog,
  getDogsPublishedByUserUID,
  setUsersListbyDog,
};
