import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

//variables de conexion
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

//conexion con aws S3
const s3client = new S3Client({
  region: process.env.AWS_REGION,
});

const generateFileURL = (key) => {
  // Assuming the standard S3 URL format
  return `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com/${key}`;
};

//funcion para subir imagenes
const awsUploadImage = async (file, path) => {
  //parametros necesarios para el upload en s3
  const params = {
    Bucket: BUCKET_NAME,
    ACL: "public-read",
    Key: `${path}`,
    Body: file,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3client.send(command);
    //we generate the URL since on V3 of the SDK, the URL is not generated automatically
    const fileUrl = generateFileURL(params.Key);
    //retornamos la url de la imagen
    return { fileUrl };
  } catch (error) {
    console.log("Failed to upload file: " + error.message);
    throw new Error("Error while saving a file.");
  }
};

const deleteFile = async (key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    return await s3Client.send(command);
  } catch (error) {
    console.log("Failed to upload file: " + error.message);
    throw new InternalServerErrorException("Error while deleting a file.");
  }
};

export default {
  awsUploadImage,
  deleteFile,
};
