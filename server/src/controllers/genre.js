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
        const genre = await Genre.find(query).exec()
        res.json(genre)
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

const create = async (req, res) => {
    try {
        const { isValid, errors } = validateGenre(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const genre = new Genre(req.body)
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

export default {
    findAll,
    findOne,
    create,
    edit,
    remove,
    genreByID
}
