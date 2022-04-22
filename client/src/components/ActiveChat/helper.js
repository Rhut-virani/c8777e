import { config } from '../../config';

export const uploadImages = async (e) => {
  const controller = new AbortController();
  let uploadedUrls = [];
  const files = e.target.files;
  const formData = new FormData();
  const url = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload`;
  for (let file of files) {
    formData.append('file', file);
    formData.append('upload_preset', config.UPLOAD_PRESET);
    const result = await fetch(url, {
      signal: controller.signal,
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
    uploadedUrls.push(result.secure_url);
  }
  return uploadedUrls;
};
