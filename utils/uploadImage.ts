export const uploadImage = async (imageUri: string, imageName: string) => {
  if (!imageUri) throw new Error("No image provided");

  try {
    const formData = new FormData();
    const fileName = imageName ? imageName : "prueba";
    console.log(fileName);
    formData.append("file", {
      uri: imageUri,
      name: fileName,
      type: "image/jpeg",
    } as any);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/user_data/user_uploads/${fileName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
          "Content-Type": "multipart/form-data",
          apikey: `${process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: formData,
      },
    );
    const data = await response.json();
    console.log("Respuesta:", data);
  } catch (error: any) {
    console.warn(error?.message);
  }
};
