import fs from 'fs'
import User from "../models/user"
import upload from '../utils/image-upload'
import bcrypt from 'bcryptjs'
import { validateUser } from '../utils/validation'
import sendEmailToAdmin from '../mailer/edit-user'


const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).populate('profile').exec()
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findAll = async (req, res) => {
    try {
        const query = {}
        if(req.query.search) {
            query.email = {$regex: req.query.search, $options: "i"}
        }
        if(req.query.checked) {
            query.checked = !!req.query.checked
        }
        if(req.query.limit) {
            const resPerPage = parseInt(req.query.limit)
            const page = parseInt(req.query.page) || 1
            const users = await User.find(query)    
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage)
            const count = await User.countDocuments()

            res.json({
                users, 
                'currentPage': page, 
                'pages' : Math.ceil(count / resPerPage), 
                total: count
            })
        } else {
            const users = await User.find().exec()
            res.json(users)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
const findAllProfile = async (req, res) => {
    try {
        const profile = await Profile.find().exec()
        res.json(profile)
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
        const { isValid, errors } = validateUser(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const user = await User.findOne({email : req.body.email})
        if (user) {
            errors.EMAIL_WAS_USED = 'Email was used!'
            return res.status(400).json(Object.keys(errors))
        }
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              const newUser = new User(req.body)
              newUser.password = hash
              newUser.confirmed = true
              const result = await newUser.save()
              res.status(200).json(result)
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const edit = async (req, res) => {
    try {
        const { isValid, errors } = validateUser(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const user = await req.user
        user.set(req.body)
        user.updatedAt = Date.now()
        const result = await user.save()
        res.json(result)
        sendEmailToAdmin(result).then(() => console.log('Email notification send successfully to the admin'))
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

const removeAll = async (req, res) => {
    try {
        // const profile = await Profile.find().exec()
        const removedUser = await Profile.deleteMany()
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

const profile = async (req, res) => {
    try {
        const user = await req.user
            user.updatedAt = Date.now()
            if(req.file){
              user.photo.data = fs.readFileSync(req.file.path)
              user.photo.contentType = req.file.mimetype
            }            
        const result = await user.save()
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}


const photo = (req, res, next) => {
    res.set("Content-Type", req.user.photo.contentType)
    return res.send(req.user.photo.data)
}
export default {
    findAll,
    findOne,
    create,
    edit,
    remove,
    setAdmin,
    profile,
    photo,
    userByID,
    findAllProfile,
    removeAll,
}
