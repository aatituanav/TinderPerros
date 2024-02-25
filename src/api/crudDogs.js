import {
  child,
  equalTo,
  get,
  limitToLast,
  orderByChild,
  orderByValue,
  push,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import { database } from "../../firebase";
import { SELECT_DOG } from "../constants/constants";

const getDogsUnviewed = async (dogsSelected) => {
  //obtiene todos los perros que no le han aparecido al usuario todavia
  const filterDogs = (allDogs, dogsSelected) => {
    /*    
          #allDogs son los perros traidos de la base 
          #dogsSeen son los perros que el usuario ha visto, tiene esta estructura 
          Retorna un arreglo de objetos
    */
    let dogsFiltered = [];
    for (let key_allDogs in allDogs) {
      if (!(allDogs[key_allDogs].uid in dogsSelected)) {
        dogsFiltered.push(allDogs[key_allDogs]);
      }
    }
    return dogsFiltered;
  };

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `dogsData`));

    if (snapshot.exists()) {
      if (dogsSelected) {
        return filterDogs(snapshot.val(), dogsSelected);
      } else {
        return Object.values(snapshot.val());
      }
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.log("Error en metodo getDogsUnviewed: " + error);
    return null;
  }
};

const putDog = async (
  userUid,
  name,
  birthdate,
  description,
  urlImage,
  breedName,
  breedId,
  blurHash
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
    blurHash: blurHash,
  });
  const a = await update(ref(database, "dogsData/" + reference.key), {
    uid: reference.key,
  });
};

const selectDog = async (user, petUid, operation) => {
  //registra match de una mascota
  //userUid: uid del usuario que dio el match
  //petUid: uid de la mascota a la cual se le dio match
  return new Promise((resolve, reject) => {
    const updates = {};
    updates["/users/" + user.uid + "/dogsSelected/" + petUid] =
      operation == SELECT_DOG;
    updates["/dogSelectedByUser/" + petUid + "/" + user.uid] = {
      operation: operation == SELECT_DOG,
      name: user.name,
      gender: user.gender,
    };
    update(ref(database), updates)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(`error en selectDog: ${error}`);
        reject(null);
      });
  });
};

const getDogsPublishedByUserUID = async (userUid) => {
  //obtiene todos los perros que un usuario ha publicado en la red
  const refToData = ref(database, "dogsData");
  const selectQuery = query(refToData, orderByChild("user"), equalTo(userUid));
  return new Promise((resolve, reject) => {
    get(selectQuery)
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => {
        console.log(`error en getDogsPublishedByUserUID: ${error}`);
        reject(null);
      });
  });
};

const getDogsAdoptionApplicantList = async (dogUid) => {
  try {
    const refToData = ref(database, `dogSelectedByUser/${dogUid}`);
    const selectQuery = query(
      refToData,
      orderByChild("operation"),
      equalTo(true)
    );
    const response = await get(selectQuery);
    return response.val();
  } catch (error) {
    console.log("Error en metodo getDogsAdoptionApplicantList: " + error);
    return null;
  }
};

export {
  getDogsUnviewed,
  selectDog,
  putDog,
  getDogsPublishedByUserUID,
  getDogsAdoptionApplicantList,
};
