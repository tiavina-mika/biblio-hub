import User from "../models/user"
import upload from '../utils/image-upload'
import { validateUser } from '../utils/validation'


const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec()
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findAll = async (req, res) => {
    try {
        const user = await User.find().exec()
        res.json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findOne = async (req, res) => {
    try {
        const user = await req.user
        res.json(user)
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
                const { isValid, errors } = validateUser(req.body)
                if(!isValid) {
                    return res.status(400).json(errors)
                }
                const user = new User(req.body)
                user.photo = req.file && req.file && `upload/image/${req.file.filename}`
                const result = await user.save()
                res.json(result.name)
                res.json({
                    message: "User created"
                })
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const edit = async (req, res) => {
    try {
        upload(req, res,async (error) => {
            if(error) {
                res.status(400).json(error)
            } else {
                const { isValid, errors } = validateUser(req.body)
                if(!isValid) {
                    return res.status(400).json(errors)
                }
                const user = await req.user
                user.set(req.body)
                user.updatedAt = Date.now()
                user.photo = req.file && req.file && `upload/image/${req.file.filename}`

                const result = await user.save()
                res.json(result)
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
}


const remove = async (req, res) => {
    try {
        const user = await req.user
        const removedUser = await user.remove()
        res.json(removedUser)
    } catch (error) {
        res.status(400).json(error)
    }
}

const setAdmin = async (req, res) => {
    try {
        const user = await req.user
        if(user.role !== "ADMIN") {
            user.role = "ADMIN"
            const result = await user.save()
            res.json(result)
        }
        return res.json({message: `USER ${user.name} IS ALREADY AN ADMIN`})
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
    setAdmin,
    userByID
}
