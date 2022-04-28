import axios from 'axios';
export const uploadImages = async (e, uploadedfiles) => {
  const files = e.target.files;
  const instance = axios.create();
  const formData = new FormData();
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
  const uploadedUrls = [];
  const promises = [];

  // Max number of files
  const maxFiles = 10;
  if (files.length + uploadedfiles > maxFiles) {
    throw new Error(
      `Too many files selected, Please select upto ${maxFiles} files at a time`,
    );
  }
  for (let file of files) {
    //file size validation
    const fileSizeLimit = 50;
    const fileSize = file.size / 1024 / 1024; // converting file size to MB
    if (fileSize > fileSizeLimit) {
      throw new Error(
        `File size more than ${fileSizeLimit}MB, Please use a smaller file size`,
      );
    } else {
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      promises.push(await instance.post(url, formData));
    }
  }

  try {
    const result = await Promise.all(promises);
    result.forEach((image) => {
      uploadedUrls.push({
        url: image.data.secure_url,
        id: image.data.public_id,
        delete_token: image.data.delete_token,
      });
    });
  } catch (error) {
    throw new Error(error);
  } finally {
    return uploadedUrls;
  }
};

export const deleteImages = async (selectedImages) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/delete_by_token`;
  const instance = axios.create();
  const formData = new FormData();
  const promises = [];

  for (let image of selectedImages) {
    formData.append('token', image.delete_token);
    promises.push(await instance.post(url, formData));
  }

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};
