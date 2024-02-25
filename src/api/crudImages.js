import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { APIDOGBREED } from "@env";

const uploadToFirebase = async (imageUri, name, onProgress) => {
  try {
    const fetchResponse = await fetch(imageUri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), name);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getBlurHash(imageUrl) {
  const localUrl = "http://192.168.1.65:8080/api/getblurhash";
  const data = {
    image_url: imageUrl,
  };
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(localUrl, options);
    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos. Código de estado: " + response.status
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null; // Retorna null en caso de error
  }
}

export { uploadToFirebase };
