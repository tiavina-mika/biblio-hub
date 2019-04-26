import express from "express"
import path from "path"
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import 'dotenv/config'
import { configPassport } from './config/passport'
import authorRouter from "./routes/author"
import bookRouter from "./routes/book"
import bookExemplaireRouter from "./routes/book-exemplaire"
import genreRouter from "./routes/genre"
import userRouter from "./routes/user"
import authRouter from "./routes/auth"

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use(passport.initialize())
// configPassport(passport)
app.use(express.static(path.join(__dirname, 'public')))
app.use("/", authorRouter)
app.use("/", bookRouter)
app.use("/", bookExemplaireRouter)
app.use("/", genreRouter)
app.use("/", userRouter)
app.use("/", authRouter)

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/biblio",{ useNewUrlParser: true})
mongoose.set('useCreateIndex', true)
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(process.env.PORT, () => {
    console.log(`listen to the server: ${process.env.PORT}`)
})
