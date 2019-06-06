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
        confirmed: {
            type: Boolean,
            default: false
        },
        checked: {type: Boolean, default: false},
        // profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
        role: {type: String, required: true, enum: ['ADMIN', 'USER', 'SUPER_ADMIN'], default: 'USER'},
        photo: {
            data: Buffer,
            contentType: String
        },
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

export default User
