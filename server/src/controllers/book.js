import Book from "../models/book"
import {validateBook} from '../utils/validation'
import upload from '../utils/book-files-upload'

// {
// 	"title": "title 7",
// 	"summary": "samury 5",
// 	"date_publication": "1983",
// 	"epub": "cool.epub",
// 	"author": "5cb810e502f38d775c76c5d7",
// 	"genre": ["5cb811e802f38d775c76c5db", "5cb811ee02f38d775c76c5dc"]
// }

const bookByID = async (req, res, next, id) => {
    try {
        const book = await Book.findById(id).populate('genre').populate('author').exec()
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
        const book = await Book.find(query).populate('genre').exec()
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        // const book = await req.book
        const book = await Book.findByIdAndUpdate(req.book, {$inc: {"views": 1}}, {new: true})
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async (req, res) => {
    try {
        upload(req, res,async (err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                const { isValid, errors } = validateBook(req.body)
                if(!isValid) {
                    return res.status(400).json(errors)
                }
                const book = new Book(req.body)

                book.epub = req.files && req.files['epub'][0] && `upload/book/${req.files['epub'][0].filename}`
                book.pdf = req.files && req.files['pdf'][0] && `upload/book/${req.files['pdf'][0].filename}`
                book.cover = req.files && req.files['cover'][0] && `upload/book/${req.files['cover'][0].filename}`

                const result = await book.save()
                res.json(result)
            }
        })
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


// const create = async (req, res) => {
//     try {
//         const book = new Book(req.fields)
//         const result = await book.save()
//         res.json(result)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// }

// const edit = async (req, res) => {
//     try {
//         const book = await req.book
//         book.set(req.body)
//         book.updatedAt = Date.now()
//         book.epub = req.files && req.files['epub'][0] && `upload/book/${req.files['epub'][0].filename}`
//         book.pdf = req.files && req.files['pdf'][0] && `upload/book/${req.files['pdf'][0].filename}`
//         book.cover = req.files && req.files['cover'][0] && `upload/book/${req.files['cover'][0].filename}`
//         const result = await book.save()
//         res.json(result)
//     } catch (error) {
//         res.status(400).json("error"+error)
//     }
// }

const edit = async (req, res) => {
    try {
        upload(req, res,async (err) => {
            if(err) {
                res.status(400).json(err)
            } else {
                const { isValid, errors } = validateBook(req.body)
                if(!isValid) {
                    return res.status(400).json(errors)
                }
                const book = await req.book
                book.set(req.body)
                book.updatedAt = Date.now()
                book.epub = req.files && req.files['epub'][0] && `upload/book/${req.files['epub'][0].filename}`
                book.pdf = req.files && req.files['pdf'][0] && `upload/book/${req.files['pdf'][0].filename}`
                book.cover = req.files && req.files['cover'][0] && `upload/book/${req.files['cover'][0].filename}`

                const result = await book.save()
                res.json(result)
            }
        })
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
        const books = await Book.find({genre: req.genre})
        res.json(books)
    } catch (error) {
        res.status(400).json(error)
    }
}

const listByAuthor = async (req, res) => {
    try {
        const books = await Book.find({author: req.author})
        res.json(books)
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
    listByGenre,
    listByAuthor,
    bookByID
}
