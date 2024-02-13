import { APIDOGBREED } from "@env";

export async function getBreed(imageUrl) {
  const url = "https://tinderperros-xz2a5u3iua-tl.a.run.app/api/predictbreed";
  const localUrl = "http://10.0.0.19:8080/api/predictbreed";
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
    const responseData = await response.json();
    // Verifica si la respuesta tiene la propiedad 'breed'
    if (responseData.breed != null) {
      return responseData;
    } else {
      throw new Error(
        "La respuesta del servidor no contiene la propiedad 'breed'."
      );
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null; // Retorna null en caso de error
  }
}
