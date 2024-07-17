import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { ApiError } from './ApiError.js';

    // Configuration
    cloudinary.config({        
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });


    // Upload an image
    const uploadonCloudinary = async (localFilePath)=>{
        try{
            if (!localFilePath) return null
            //upload file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            //file has been succefully uploaded
            console.log("File is uploaded on cloudinary", response.url)
            fs.unlinkSync(localFilePath)
            return response

        }catch(error){
            fs.unlinkSync(localFilePath);// remove the local save file 
            console.log("not uploaded");
            return null
        }
    };

    const deleteFromCloudinary = async (publicId) => {
        try {
            const response = await cloudinary.uploader.destroy(publicId);
            console.log("File is deleted from Cloudinary", response.result);
            return response;
        } catch (error) {
            console.log("File not deleted", error);
            return null;
        }
    };
export {uploadonCloudinary,deleteFromCloudinary}