import multer from 'multer'
import path from 'path'
import { validateFile } from './utils'

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/upload/book',
  filename: (req, file, fn) => {
    fn(null,  `${new Date().getTime().toString()}-${file.fieldname+path.extname(file.originalname)}`);
  }
}); 

const upload =  multer({
  storage: storageEngine,
  limits: { fileSize : 2000000 },
  // fileFilter: (req, file, callback) => {
  //   validateFile(/jpeg|jpg|png|gif/ || /epub/ || /pdf/, file, callback)
  // }
})
// .fields([
//     { name: 'cover', maxCount: 1 }, 
//     { name: 'epub', maxCount: 1 },
//     { name: 'pdf', maxCount: 1 },
// ])

export default upload;