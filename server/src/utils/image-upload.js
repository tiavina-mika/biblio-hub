import multer from 'multer'
import path from 'path'
import { validateFile } from './utils'

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/upload/image',
  filename: (req, file, fn) => {
    fn(null,  `${new Date().getTime().toString()}-${file.fieldname+path.extname(file.originalname)}`)
  }
}); 

const upload =  multer({
  storage: storageEngine,
  limits: { fileSize : 2000000 },
  // fileFilter: (req, file, callback) => {
  //   validateFile('image', file, callback)
  // }
  fileFilter: (req, file, callback) => {
  	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  		callback(null, true)
  	} else {
  		callback(null, false)
  	}
  }
});
// }).single('photo');

export default upload;