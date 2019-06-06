import fs from 'fs'
import Book from "../models/book"
import {validateBook} from '../utils/validation'
import upload from '../utils/book-files-upload'
import sendEmail from '../mailer/comment'

const bookByID = async (req, res, next, id) => {
    try {
        const book = await Book.findById(id).populate('genres').populate('author').populate('comments.postedBy').exec()
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
        if(req.query.publish) {
            query.publish = req.query.publish
        }
        if(req.query.member) {
            query.member = req.query.member
        }
        if(req.query.limit) {
            const resPerPage = parseInt(req.query.limit)
            const page = parseInt(req.query.page) || 1
            const books = await Book.find(query)    
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage)
                .sort(`-${req.query.sort || 'createdAt'}`)
                .populate('genres', 'name')
                .populate('author', 'slug first_name family_name')
            const count = await Book.countDocuments()
            res.json({
                books, 
                'currentPage': page, 
                'pages' : Math.ceil(count / resPerPage), 
                total: count
            })
        } else {
            const books = await Book.find(query).populate('genres name').populate('author').exec()
            res.json(books)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        const book = await req.book
        const result = await book.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOneBySlug = async (req, res) => {
    try {
          const book = await Book.findOneAndUpdate({slug: req.params.slug}, {$inc: {"views": 1}}, {new: true})
            .populate('genres', 'name slug')
            .populate('author')
            .populate('comments.postedBy', '_id name')
            .exec()
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
        book.genres = [...req.body.genres.split(',')]
        book.publish = !!req.body.publish
        book.member = !!req.body.member
        if(req.files) {
            if(req.files['epub']) {
                book.epub.data = fs.readFileSync(req.files['epub'][0].path)
                book.epub.contentType = req.files['epub'][0].mimetype
                book.epub.size = req.files['epub'][0].size
            }
            if(req.files['pdf']){
               book.pdf.data = fs.readFileSync(req.files['pdf'][0].path)
                book.pdf.contentType = req.files['pdf'][0].mimetype
                book.pdf.size = req.files['pdf'][0].size           
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
    
const edit = async (req, res) => {
    try {

        const { isValid, errors } = validateBook(req.body)
        if(!isValid) {
            return res.status(400).json(Object.keys(errors))
        }
        const book = await req.book
        book.set(req.body)
        book.updatedAt = Date.now()
        book.genres = [...new Set(req.body.genres.split(','))]
        book.publish = !!req.body.publish
        book.member = !!req.body.member
         if(req.files) {
            if(req.files['epub']) {
                book.epub.data = fs.readFileSync(req.files['epub'][0].path)
                book.epub.contentType = req.files['epub'][0].mimetype
                book.epub.size = req.files['epub'][0].size
            }
            if(req.files['pdf']){
                book.pdf.data = fs.readFileSync(req.files['pdf'][0].path)
                book.pdf.contentType = req.files['pdf'][0].mimetype
                book.epub.size = req.files['pdf'][0].size
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
        const query = {}
        if(req.query.publish) {
            query.publish = !!req.query.publish
        }
        if(req.query.limit) {
            query.genres = req.genre
            const books = await Book.find(query).limit(parseInt(req.query.limit))
                                .populate('author', 'first_name family_name')
                                .exec()
            res.json(books)
        }
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

const comment = async (req, res) => {
    try {
      let comment = req.body.comment
      comment.postedBy = req.body.userId
      const result = await Book.findByIdAndUpdate(req.body.bookId, {$push: {comments: comment}, $inc: {"newComment": 1}}, {new: true})
          .populate('comments.postedBy')
          .exec()

            const lastComment = result.comments[result.comments.length-1]
            sendEmail(lastComment, result)
                .then(() => console.log('Email send successfuly'))
        res.json(result)
    } catch(error) {
        res.status(400).json(error)
    }
}


const uncomment = async (req, res) => {
    try {
      let comment = req.body.comment

      if(req.body.userId === comment.postedBy._id) {
          const result = await Book.findByIdAndUpdate(req.body.bookId, {$pull: {comments: {_id: comment._id}, $inc: {"newComment": -1}}}, {new: true})
              .populate('comments.postedBy', '_id name')
              .exec()
            res.json(result)
      } else {
        res.json({USER_NON_AUTORIZED: 'User non authorized'})
      }

    } catch(error) {
        res.status(400).json(error)
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.book.photo.contentType)
    return res.send(req.book.photo.data)
}
const pdf = (req, res, next) => {
    Book.findOneAndUpdate({_id: req.book._id}, {$inc: {"download": 1}}, {new: true})
        .then(book => book.save())
    res.set("Content-Type", req.book.pdf.contentType)
    return res.send(req.book.pdf.data)
}
const epub = (req, res, next) => {
    Book.findOneAndUpdate({_id: req.book._id}, {$inc: {"download": 1}}, {new: true})
        .then(book => book.save())
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
    findOneBySlug,
    comment,
    uncomment,
    bookByID
}
