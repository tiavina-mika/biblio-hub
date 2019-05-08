import mongoose from 'mongoose'
import slug from 'slug'

const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
        photo: {
            data: Buffer,
            contentType: String
        },
        slug: {type: String,trim: true,lowercase: true},
        description: {type: String},
        createdAt: {type: Date,default: Date.now},
        updatedAt: {type: Date}
    }
)

AuthorSchema.pre('validate', function (next) {
    this._slugify()
    next()
})
AuthorSchema.methods = {
    _slugify() {
        this.slug = slug(`${this.first_name} ${this.family_name && this.family_name}`)
    }
}

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get( () => {
        return this.family_name + ', ' + this.first_name
    })

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get( () => {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
    })

//Export model
export default mongoose.model('Author', AuthorSchema)
