import fs from 'fs'
import moment from 'moment'
import Book from "../models/book"
import {validateBook} from '../utils/validation'
import upload from '../utils/book-files-upload'

const bookByID = async (req, res, next, id) => {
    try {
        const book = await Book.findById(id).populate('genres').populate('author').exec()
        req.book = book
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findAll = async (req, res) => {
    try {
        const query = {}
        if(req.query.search) {
            query.title = {$regex: req.query.search, $options: "i"}
        }
        const book = await Book.find(query).populate('genres').populate('author').exec()
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        const book = await req.book
        // const book = await Book.findById(req.book._id).populate('genres').populate('author').exec()

        // const book = await Book.findByIdAndUpdate(req.book, {$inc: {"views": 1}}, {new: true}).populate('genres').populate('author')
        // const book = await Book.findById(req.book).populate('genres').populate('author')
        book.views++
        // book.populate('genres').populate('author'))
        const result = await book.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async (req, res) => {
    try {
        const { isValid, errors } = validateBook(req.body)
        if(!isValid) {
            return res.status(400).json(Object.keys(errors))
        }
        const book = new Book(req.body)
        // console.log('req', req.body)
        console.log('req.mod',  moment(req.body.date_publication).format('DD MMMM YYYY'))
        book.genres = [...req.body.genres.split(',')]
        // book.date_publication =
        // book.publish = typeof(req.body.publish) === 'undefined' ? false : req.body.publish
        if(req.files) {
            if(req.files['epub']) {
                book.epub.data = fs.readFileSync(req.files['epub'][0].path)
                book.epub.contentType = req.files['epub'][0].mimetype
            }
            if(req.files['pdf']){
               book.pdf.data = fs.readFileSync(req.files['pdf'][0].path)
                book.pdf.contentType = req.files['pdf'][0].mimetype             
            }
            if(req.files['photo']){
                book.photo.data = fs.readFileSync(req.files['photo'][0].path)
                book.photo.contentType = req.files['photo'][0].mimetype           
            }

        }
        const result = await book.save()
        res.json(result)
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
          
//                     const book = new Book(req.body)
//                     book.cover = req.file && `upload/image/${req.file}`
//                     const result = await book.save()
//                     res.json(result)
//             }
//         })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }

// const create = async (req, res) => {
//     try {
//         const book = new Book(req.body)
//         const result = await book.save()
//         res.json(result)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }


const edit = async (req, res) => {
    try {

        const { isValid, errors } = validateBook(req.body)
        if(!isValid) {
            return res.status(400).json(Object.keys(errors))
        }
        const book = await req.book
        book.set(req.body)
        book.updatedAt = Date.now()
        book.date_publication = moment(req.body.date_publication).format('DD MMMM YYYY')
        book.genres = [...new Set(req.body.genres.split(','))]
        // book.genres = [...req.body.genres.split(',').filter(n => !!n && !/\W/g.test(n))]
        // book.genres = req.body.genres.map(n => typeof(n) === 'object' ? n._id : n)
        // book.author = req.body.author.map(n => typeof(n) === 'object' ? n._id : n)
        // book.genres = [... req.body.genres]
        // book.author = req.body.author ? req.body.author : book.author
        console.log('genres', req.body.genres)
        // console.log('author', req.body.author)
        // console.log('reqMod2', [...req.body.genres.split(',').filter(n => !!n && !/\W/g.test(n))])
        book.publish = typeof(req.body.publish) === 'undefined' ? false : req.body.publish
         if(req.files) {
            if(req.files['epub']) {
                book.epub.data = fs.readFileSync(req.files['epub'][0].path)
                book.epub.contentType = req.files['epub'][0].mimetype
            }
            if(req.files['pdf']){
               book.pdf.data = fs.readFileSync(req.files['pdf'][0].path)
                book.pdf.contentType = req.files['pdf'][0].mimetype             
            }
            if(req.files['photo']){
                book.photo.data = fs.readFileSync(req.files['photo'][0].path)
                book.photo.contentType = req.files['photo'][0].mimetype           
            }

        }
        const result = await book.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}



const remove = async (req, res) => {
    try {
        const book = await req.book
        const removedBook = await book.remove()
        res.json(removedBook)
    } catch (error) {
        res.status(400).json(error)
    }
}

const listByGenre = async (req, res) => {
    try {
        const books = await Book.find({genres: req.genre}).populate('author').exec()
        res.json(books)
    } catch (error) {
        res.status(400).json(error)
    }
}

const listByAuthor = async (req, res) => {
    try {
        const books = await Book.find({author: req.author}).populate('author').exec()
        res.json(books)
    } catch (error) {
        res.status(400).json(error)
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.book.photo.contentType)
    return res.send(req.book.photo.data)
}
const pdf = (req, res, next) => {
    res.set("Content-Type", req.book.pdf.contentType)
    return res.send(req.book.pdf.data)
}
const epub = (req, res, next) => {
    res.set("Content-Type", req.book.epub.contentType)
    return res.send(req.book.epub.data)
}

export default {
    findAll,
    findOne,
    create,
    edit,
    remove,
    listByGenre,
    listByAuthor,
    photo,
    pdf,
    epub,
    bookByID
}
