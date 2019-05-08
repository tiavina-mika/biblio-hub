import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import Local from 'passport-local'
const LocalStrategy = Local.Strategy

const localOpts = {
    usernameField: 'email',
}
const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await User.findOne({email})
        if (!user) {
            return done(null, false)
        } else if (!bcrypt.compare(password, user.password)) {
            return done(null, false)
        }
        return done(null, user)
    } catch (e) {
     return done(e, false)
    }
})

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
            //Identify user by ID
        const user = await User.findById(payload._id)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    } catch (e) {
        return done(e, false)
    }
})

passport.use(localStrategy)
passport.use(jwtStrategy)

export const authLocal = passport.authenticate('local', {session: false})
export const authJwt = passport.authenticate('jwt', { session: false })

