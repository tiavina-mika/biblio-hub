import path from 'path'

export const validateFile = (fileTypes, file, cb ) => {
	let allowedFileTypes
	if(fileTypes === 'image') {
		allowedFileTypes = /jpeg|jpg|png|gif/
	} else if (fileTypes === 'epub') {
		allowedFileTypes = /epub/	
	} else if (fileTypes === 'pdf') {
		allowedFileTypes = /pdf/	
	} else {
		cb(null, false)
	}
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType  = allowedFileTypes.test(file.mimetype);

    if(extension && mimeType){
       cb(null, true)
    }else{
       cb(null, false)
    }
}

// export const validateFile = (file, cb) => {
// 	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//   		cb(null, true)
//   	} else {
//   		cb(null, false)
//   	}
// }

// export default {
//     validateFile
// }