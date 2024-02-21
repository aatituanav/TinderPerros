const getMissingSelectingDogs = (allDogs, dogsSelected, dogsDismmised) => {
  console.log("datos de entada al metodo===============");
  console.log(dogsSelected);
  console.log(dogsDismmised);
  //este metodo compara allDogs con los perros que ya se han seleccionado (ya sea con like o dislike) y me devuelve un arreglo con los perros que faltan de seleccionar
  /*const allDogs = [
    {
      breedId: 88,
      breedName: "Bernese_mountain_dog",
      description: "Le gusta comer niños",
      name: "Bruno",
      uid: "-Nqz_oquYy42LweP0ugl",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A04%3A06%20GMT-0500?alt=media&token=fd170a8d-1778-4d23-b3f4-50d4a3be8f3d",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2019",
    },
    {
      breedId: 57,
      breedName: "Labrador_retriever",
      description: "Le gusta los huesos",
      name: "Pepe",
      uid: "-Nqza6K-Fn-uIdnQsYZc",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A20%3A23%20GMT-0500?alt=media&token=8b2caffa-0a85-491b-8f65-652850ec4368",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2020",
    },
    {
      breedId: 11,
      breedName: "beagle",
      description: "Le gusta el palo",
      name: "Salchichón ",
      uid: "-NqzaNZ-0gt-50hmd9j7",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A21%3A30%20GMT-0500?alt=media&token=4c8ebac1-555b-4696-b338-bc1e2beadb28",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2023",
    },
    {
      breedId: 99,
      breedName: "Siberian_husky",
      description: "Es blanco y negro, y le gusta mucho el lago",
      name: "Dragón ",
      uid: "-NqzdfUGMCo4KTW1IG4O",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A31%3A08%20GMT-0500?alt=media&token=48845937-c454-4edb-b538-e7bf1e2f1e2e",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2016",
    },
    {
      breedId: 0,
      breedName: "Chihuahua",
      description:
        "Ese si es un perro peligrosisimo. Come niños de desayuno y le gusta atacar policías corruptos. Excelente compañía para los choros",
      name: "Tarzan",
      uid: "-Nqzg8NJMKFZTpaH3PvN",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A45%3A01%20GMT-0500?alt=media&token=81f88589-f16c-4888-8a43-ae2fd4f2e79f",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2006",
    },
    {
      breedId: 100,
      breedName: "Siberian_husky",
      description: "Es un perro loco y olvidadizo. ",
      name: "El Pepe",
      uid: "-NqzgZfGmkseDZPfVP4V",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A48%3A29%20GMT-0500?alt=media&token=2c6377a8-b45b-4eb5-a4f5-7474be0eb839",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2006",
    },
  ];

  const dogsSelected = [
    {
      breedId: 0,
      breedName: "Chihuahua",
      description:
        "Ese si es un perro peligrosisimo. Come niños de desayuno y le gusta atacar policías corruptos. Excelente compañía para los choros",
      name: "Tarzan",
      uid: "-Nqzg8NJMKFZTpaH3PvN",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A45%3A01%20GMT-0500?alt=media&token=81f88589-f16c-4888-8a43-ae2fd4f2e79f",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2006",
    },
    {
      breedId: 100,
      breedName: "Siberian_husky",
      description: "Es un perro loco y olvidadizo. ",
      name: "El Pepe",
      uid: "-NqzgZfGmkseDZPfVP4V",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A48%3A29%20GMT-0500?alt=media&token=2c6377a8-b45b-4eb5-a4f5-7474be0eb839",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2006",
    },
  ];
  const dogsDismmised = [
    {
      breedId: 88,
      breedName: "Bernese_mountain_dog",
      description: "Le gusta comer niños",
      name: "Bruno",
      uid: "-Nqz_oquYy42LweP0ugl",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A04%3A06%20GMT-0500?alt=media&token=fd170a8d-1778-4d23-b3f4-50d4a3be8f3d",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2019",
    },
    {
      breedId: 11,
      breedName: "beagle",
      description: "Le gusta el palo",
      name: "Salchichón ",
      uid: "-NqzaNZ-0gt-50hmd9j7",
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/tinderperros-161f1.appspot.com/o/dogsImages%2F2Fy0LjBUlNQUGQaWkZpt82ogCXg1_Sun%20Feb%2018%202024%2023%3A21%3A30%20GMT-0500?alt=media&token=4c8ebac1-555b-4696-b338-bc1e2beadb28",
      user: "2Fy0LjBUlNQUGQaWkZpt82ogCXg1",
      yearBirth: "2023",
    },
  ];
*/
  let dogsForget = [];

  for (let key_allDogs in allDogs) {
    let perroEncontrado2 = undefined;
    let perroEncontrado = undefined;
    if (dogsSelected != undefined) {
      perroEncontrado2 = dogsSelected.find(
        (perro) => perro.uid === allDogs[key_allDogs].uid
      );
    }
    if (dogsDismmised != undefined) {
      perroEncontrado = dogsDismmised.find(
        (perro) => perro.uid === allDogs[key_allDogs].uid
      );
    }
    if (perroEncontrado == undefined && perroEncontrado2 == undefined) {
      dogsForget.push(allDogs[key_allDogs]);
    }
  }

  return dogsForget;
};

export { getMissingSelectingDogs };
