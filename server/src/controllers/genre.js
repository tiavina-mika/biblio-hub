import fs from 'fs'
import upload from '../utils/image-upload'
import Genre from "../models/genre"
import { validateGenre } from '../utils/validation'

const genreByID = async (req, res, next, id) => {
    try {
        const genre = await Genre.findById(id).exec()
        req.genre = genre
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findAll = async (req, res) => {
    try {
        const query = {}
        if(req.query.search) {
            query.name = {$regex: req.query.search, $options: "i"}
        }
        if(req.query.limit) {
            const resPerPage = parseInt(req.query.limit)
            const page = parseInt(req.query.page) || 1
            const genres = await Genre.find(query)    
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage)
            const count = await Genre.countDocuments()
            res.json({
                genres, 
                'currentPage': page, 
                'pages' : Math.ceil(count / resPerPage), 
                total: count
            })
        } else {
            const genres = await Genre.find(query).exec()
            res.json(genres)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        const genre = await req.genre
        res.json(genre)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOneBySlug = async (req, res) => {
    try {
        const genre = await Genre.findOne({slug: req.params.slug}).exec()
        const result = await genre.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async (req, res) => {
    try {
        const { isValid, errors } = validateGenre(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const genre = new Genre(req.body)
        if(req.file){
          genre.photo.data = fs.readFileSync(req.file.path)
          genre.photo.contentType = req.file.mimetype
        }
        const result = await genre.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const edit = async (req, res) => {
    try {
        const { isValid, errors } = validateGenre(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const genre = await req.genre
        genre.set(req.body)
        genre.updatedAt = Date.now()
        if(req.file){
          genre.photo.data = fs.readFileSync(req.file.path)
          genre.photo.contentType = req.file.mimetype
        } 
        const result = await genre.save()
        res.json(result)
    } catch (error) {
        res.status(400).json("error"+error)
    }
}

const remove = async (req, res) => {
    try {
        const genre = await req.genre
        const removedGenre = await genre.remove()
        res.json(removedGenre)
    } catch (error) {
        res.status(400).json(error)
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.genre.photo.contentType)
    return res.send(req.genre.photo.data)
}

export default {
    findAll,
    findOne,
    create,
    edit,
    remove,
    photo,
    findOneBySlug,
    genreByID
}
