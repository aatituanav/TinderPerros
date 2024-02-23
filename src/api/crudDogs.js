import {
  child,
  equalTo,
  get,
  limitToLast,
  orderByChild,
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
    console.log("Error en metodo getDogs: " + error);
    return null;
  }
};
const getDogsPublishedByUserUID = async (userUid) => {
  //obtiene todos los perros que un usuario ha publicado en la red
  const refToData = ref(database, "dogsData");
  const selectQuery = query(refToData, orderByChild("user"), equalTo(userUid));
  return new Promise((resolve, reject) => {
    get(selectQuery)
      .then((snapshot) => {
        console.log("inside");
        resolve(snapshot.val());
      })
      .catch((error) => {
        console.log(`error en getDogsPublishedByUserUID: ${error}`);
        reject(null);
      });
  });
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

const selectDog = async (userUid, petUid, operation) => {
  //registra match de una mascota
  //userUid: uid del usuario que dio el match
  //petUid: uid de la mascota a la cual se le dio match
  return new Promise((resolve, reject) => {
    const updates = {};
    updates["/users/" + userUid + "/dogsSelected/" + petUid] =
      operation == SELECT_DOG;
    updates["/dogSelectedByUser/" + petUid + "/" + userUid] =
      operation == SELECT_DOG;
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

/*const setUsersListbyDog = async (dogUid, userUid) => {
  //actualizar la lista de personas que hicieron match con determinada mascota
  const newPostKey = push(child(ref(database), "users")).key;
  console.log(newPostKey);
};*/

export { getDogsUnviewed, selectDog, putDog, getDogsPublishedByUserUID };
