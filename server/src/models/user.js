import mongoose from 'mongoose'
import crypto from 'crypto'
import slug from 'slug'

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {type: String,trim: true,required: 'Name is required'},
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            required: 'Email is required'
        },
        password: {
            type: String,
            min: 6,
            max: 50,
            required: "Password is required"
        },
        profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
        role: {type: String, required: true, enum: ['ADMIN', 'USER', 'SUPER_ADMIN'], default: 'USER'},
        // photo: {
        //     data: Buffer,
        //     contentType: String
        // },
        slug: {type: String,trim: true,lowercase: true},

        createdAt: {type: Date,default: Date.now},
        updatedAt: {type: Date}
    }
)

UserSchema.pre('validate', function (next) {
    this._slugify()
    next()
})
UserSchema.methods = {
    _slugify() {
        this.slug = slug(`${this.name}`)
    }
}
// UserSchema.pre('save', next => {
//     if (this.isModified('password')) {
//         this.password = thsi._hashPassword(this.password)
//     }
//     return next()
// })
// UserSchema.methods = {
//     _hashPassword(password) {
//         return hashSync(password)
//     },
//     authenticateUser(password) {
//         return compareSync(Password, this.password)
//     }
// }

// UserSchema
//     .virtual('password')
//     .set((password) => {
//         this.password = password
//         this.salt = this.makeSalt()
//         this.hashed_password = this.encryptPassword(password)
//     })
//     .get(() => {
//         return this.password
//     })
  
// UserSchema.path('hashed_password').validate((v) => {
//     if (this.password && this.password.length < 6) {
//         this.invalidate('password', 'Password must be at least 6 characters.')
//     }
//     if (!this.password) {
//         this.invalidate('password', 'Password is required')
//     }
//     }, null)

// UserSchema.methods = {
//     authenticate: plainText => {
//         return this.encryptPassword(plainText) === this.hashed_password
//     },
//     encryptPassword: password => {
//         if (!password) return ''
//         try {
//         return crypto
//             .createHmac('sha1', this.salt)
//             .update(password)
//             .digest('hex')
//         } catch (err) {
//         return ''
//         }
//     },
//     makeSalt: function() {
//         return Math.round((new Date().valueOf() * Math.random())) + ''
//     }
// }

const modelAlreadyDeclared = () => {
    try {
      mongoose.model('User')  // it throws an error if the model is still not defined
      return true
    } catch (e) {
      return false
    }
  }
  
  let User
  if (! modelAlreadyDeclared()) {
    User = mongoose.model('User', UserSchema)
  }

//Export model
export default User

// export default mongoose.model('User', UserSchema)
