import BookExemplaire from "../models/book-exemplaire"

const bookExemplaireByID = async (req, res, next, id) => {
    try {
        const bookExemplaire = await BookExemplaire.findById(id).exec()
        req.bookExemplaire = bookExemplaire
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findAll = async (req, res) => {
    try {
        const bookExemplaire = await BookExemplaire.find().populate('book').exec()
        res.json(bookExemplaire)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        const bookExemplaire = await req.bookExemplaire
        res.json(bookExemplaire)
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async (req, res) => {
    try {
        const bookExemplaire = new BookExemplaire(req.body)
        const result = await bookExemplaire.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const edit = async (req, res) => {
    try {
        const bookExemplaire = await req.bookExemplaire
        bookExemplaire.set(req.body)
        article.updatedAt = Date.now()
        const result = await bookExemplaire.save()
        res.json(result)
    } catch (error) {
        res.status(400).json("error"+error)
    }
}

const remove = async (req, res) => {
    try {
        const bookExemplaire = await req.bookExemplaire
        const removedBookExemplaire = await bookExemplaire.remove()
        res.json(removedBookExemplaire)
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
    bookExemplaireByID
}
