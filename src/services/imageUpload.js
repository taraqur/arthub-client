export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.");
  }

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error(data.error?.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
