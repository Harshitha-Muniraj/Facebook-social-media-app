import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
  });



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profile-pics',
      format: async (req,file)=>{
        let extArray=file.originalname.split(".");
        let extension=extArray[extArray.length-1];
        return extension;
      }
      
    },
  });

  const parser = multer({ 
    storage: storage ,
    fileFilter: function (req, file, cb) {
        // Accept images only
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        let allowedExt = ["png", "jpg", "jpeg"];
        if (!allowedExt.includes(extension)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      }

});

  export default parser;