import fs from 'fs'
import Author from "../models/author"
import upload from '../utils/image-upload'
import { validateAuthor } from '../utils/validation'

const authorByID = async (req, res, next, id) => {
    try {
        const author = await Author.findById(id).exec()
        req.author = author
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findAll = async (req, res) => {
    try {
        const query = {}
        if(req.query.search) {
            query.family_name = {$regex: req.query.search, $options: "i"}
        }

        if(parseInt(req.query.size)) {
        const resPerPage = parseInt(req.query.size)
        const page = req.params.page || 1
            const authors = await Author.find()
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage)
            const count = await Author.count()

            res.json({authors, 'currentPage': page, 'pages' : Math.ceil(count / resPerPage), total: count})
        }

        const author = await Author.find(query).exec()
        res.json(author)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        const author = await req.author
        res.json(author)
    } catch (error) {
        res.status(400).json(error)
    }
}

// const create = async (req, res) => {
//     try {
//         upload(req, res,async (error) => {
//             if(error) {
//                 res.status(400).json(error)
//             } else {
//                 const { isValid, errors } = validateAuthor(req.body)
//                 if(!isValid) {
//                     return res.status(400).json(errors)
//                 }
//                 const author = new Author(req.body)
//                 author.photo = req.file && req.file.path
//                 // author.photo = req.file && req.file && `upload/image/${req.file.filename}`
//                 const result = await author.save()
//                 res.json(result)
//             }
//         })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }

const create = async (req, res) => {
    try {
        const { isValid, errors } = validateAuthor(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const author = new Author(req.body)
            if(req.file){
                // const path = `/upload/image/${req.file.filename}`
              author.photo.data = fs.readFileSync(req.file.path)
              author.photo.contentType = req.file.mimetype
            }
        // author.photo = req.file && `public/upload/image/${req.file.filename}`
        // console.log('author: ', req.file)
        const result = await author.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}
// author:  { fieldname: 'photo',
//   originalname: 'business-flyer-template_52683-4095.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: './public/upload/image',
//   filename: '1556540857561-photo.jpg',
//   path: 'public\\upload\\image\\1556540857561-photo.jpg',
//   size: 95202 }


// const edit = async (req, res) => {
//     try {
//         const author = await req.author
//         author.set(req.body)
//         article.updatedAt = Date.now()
//         author.photo = req.file && req.file && `upload/image/${req.file.filename}`
//         const result = await author.save()
//         res.json(result)
//     } catch (error) {
//         res.status(400).json("error"+error)
//     }
// }

const edit = async (req, res) => {
    try {
        const { isValid, errors } = validateAuthor(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const author = await req.author
            author.set(req.body)
            author.updatedAt = Date.now()
            if(req.file){
                // const path = `/upload/image/${req.file.filename}`
              author.photo.data = fs.readFileSync(req.file.path)
              author.photo.contentType = req.file.mimetype
            }            
        // author.photo = req.file && `public/upload/image/${req.file.filename}`
        // console.log('author: ', req.file)
        const result = await author.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

// const edit = async (req, res) => {
//     try {
//         upload(req, res,async (error) => {
//             if(error) {
//                 res.status(400).json(error)
//             } else {
//                 const { isValid, errors } = validateAuthor(req.body)
//                 if(!isValid) {
//                     return res.status(400).json(errors)
//                 }
//                 const author = await req.author
//                 author.set(req.body)
//                 article.updatedAt = Date.now()
//                 author.photo = req.file && req.file && `/upload/image/${req.file.filename}`

//                 const result = await author.save()
//                 res.json(result)
//             }
//         })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }


const remove = async (req, res) => {
    try {
        const author = await req.author
        const removedAuthor = await author.remove()
        res.json(removedAuthor)
    } catch (error) {
        res.status(400).json(error)
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.author.photo.contentType)
    return res.send(req.author.photo.data)
}

export default {
    findAll,
    findOne,
    create,
    edit,
    remove,
    authorByID,
    photo
}
