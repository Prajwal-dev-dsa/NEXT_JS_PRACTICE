import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (
  file: Blob | null
): Promise<string | null> => {
  if (!file) return null;
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (err, result) => {
          if (err) return rej(err);
          res(result?.secure_url ?? null);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    return null;
  }
};

export default uploadOnCloudinary;
