import { Request } from "express";
import multer from "multer";
import path from "path";
import "express";

const UPLOADS_PATH = process.env.UPLOADS_PATH || 'uploads';

export interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH)
  },
  filename: (req, file, cb) => {
    const id = req.body.id
    
    const extension = path.extname(file.originalname);

    cb(null, id + extension);
  }
});

export const upload = multer({ storage }); 
