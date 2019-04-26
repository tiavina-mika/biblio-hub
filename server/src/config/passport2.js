import passportJwt from 'passport-jwt'
import User from '../models/User'

const JwtStrategy =passportJwt.Strategy 
const ExtractJwt =passportJwt.ExtractJwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

export const configPassport = passport => {
	passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
		    const user = await User.findById(jwt_payload.id)
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
		} catch (err) {
				return done(err, false)
		}
	}))
}

