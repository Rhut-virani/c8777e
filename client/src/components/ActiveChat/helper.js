import { config } from '../../config';

export const uploadImages = async (e) => {
  const controller = new AbortController();
  let uploadedUrls = [];
  const files = e.target.files;
  const formData = new FormData();
  const url = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload`;

  // Max number of files
  const maxFiles = 10;
  if (files.length > maxFiles) {
    throw new Error(
      `Too many files selected, Please select upto ${maxFiles} files at a time`,
    );
  }
  for (let file of files) {
    //file size validation
    const fileSizeLimit = 50;
    const fileSize = file.size / 1024 / 1024; // converting file size to mb
    if (fileSize > fileSizeLimit) {
      throw new Error(
        `File size more than ${fileSizeLimit}mb, Please use a smaller file size`,
      );
    } else {
      formData.append('file', file);
      formData.append('upload_preset', config.UPLOAD_PRESET);
      await fetch(url, {
        signal: controller.signal,
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // check if any errors in response
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((result) => {
          uploadedUrls.push(result.secure_url);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
  return uploadedUrls;
};
