export const uploadImage = async (data) => {
  try {
    const serverData = await fetch(
      "https://api.cloudinary.com/v1_1/emadul-hoque-emon/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const response = await serverData.json();
    return response.url;
  } catch (error) {
    console.log(error);
  }
};
