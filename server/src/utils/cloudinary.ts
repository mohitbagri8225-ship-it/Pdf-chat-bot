import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

//   (!) <- rem this 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadResult = async (filePath: string) => {
  try {
    if (!filePath) {
      throw new Error("File path is required for upload");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("Upload successful:", result.url);

    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadResult;