import multer from 'multer'
import path from 'path'
import { validateFile } from './utils'

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/upload/image',
  filename: (req, file, fn) => {
    fn(null,  `${new Date().getTime().toString()}-${file.fieldname+path.extname(file.originalname)}`);
  }
}); 

const upload =  multer({
  storage: storageEngine,
  limits: { fileSize : 200000 },
  fileFilter: (req, file, callback) => {
    validateFile(/jpeg|jpg|png|gif/, file, callback);
  }
}).single('photo');

export default upload;