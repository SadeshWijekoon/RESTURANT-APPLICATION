import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLODINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

const uploadImageClodinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'binkeyit' }, (error, uploadResult) => {
        if (error) {
          return reject(error); // Reject the promise if there's an error
        }
        resolve(uploadResult); // Resolve the promise with the result
      })
      .end(buffer);
  });

  return uploadImage;
};

export default uploadImageClodinary;
