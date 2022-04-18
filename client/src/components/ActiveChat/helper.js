import { config } from '../../config';

export const uploadImages = async (e) => {
  const uploadedUrls = [];
  const files = e.target.files;
  const formData = new FormData();
  const url = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload`;

  for (let file of files) {
    formData.append('file', file);
    formData.append('upload_preset', config.UPLOAD_PRESET);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json());

    uploadedUrls.push(res.secure_url);
  }
  return uploadedUrls;
};
