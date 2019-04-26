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
        const author = await Author.find().exec()
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

const create = async (req, res) => {
    try {
        upload(req, res,async (error) => {
            if(error) {
                res.status(400).json(error)
            } else {
                const { isValid, errors } = validateAuthor(req.body)
                if(!isValid) {
                    return res.status(400).json(errors)
                }
                const author = new Author(req.body)
                author.photo = req.file && req.file && `upload/image/${req.file.filename}`
                const result = await author.save()
                res.json(result)
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

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
        upload(req, res,async (error) => {
            if(error) {
                res.status(400).json(error)
            } else {
                const { isValid, errors } = validateAuthor(req.body)
                if(!isValid) {
                    return res.status(400).json(errors)
                }
                const author = await req.author
                author.set(req.body)
                article.updatedAt = Date.now()
                author.photo = req.file && req.file && `upload/image/${req.file.filename}`

                const result = await author.save()
                res.json(result)
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
}


const remove = async (req, res) => {
    try {
        const author = await req.author
        const removedAuthor = await author.remove()
        res.json(removedAuthor)
    } catch (error) {
        res.status(400).json(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    edit,
    remove,
    authorByID
}
