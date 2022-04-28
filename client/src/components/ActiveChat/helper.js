export const uploadImages = async (e) => {
  const controller = new AbortController();
  let uploadedUrls = [];
  const files = e.target.files;
  const formData = new FormData();
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

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
    const fileSize = file.size / 1024 / 1024; // converting file size to MB
    if (fileSize > fileSizeLimit) {
      throw new Error(
        `File size more than ${fileSizeLimit}MB, Please use a smaller file size`,
      );
    } else {
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
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
          uploadedUrls.push({
            url: result.secure_url,
            id: result.public_id,
            delete_token: result.delete_token,
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
  return uploadedUrls;
};

export const deleteImages = (selectedImages) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/delete_by_token`;
  const formData = new FormData();
  for (let image of selectedImages) {
    formData.append('token', image.delete_token);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
