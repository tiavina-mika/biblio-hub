const validateFile = (fileTypes, file, cb ) => {
    allowedFileTypes =  fileTypes
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType  = allowedFileTypes.test(file.mimetype);
    if(extension && mimeType){
      return cb(null, true)
    }else{
      cb("Invalid file type.")
    }
}

export default {
    validateFile
}