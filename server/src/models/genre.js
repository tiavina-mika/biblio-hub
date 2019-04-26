import mongoose from 'mongoose'
import slug from 'slug'

const Schema = mongoose.Schema

const GenreSchema = new Schema(
    {
        name: {type: String, required: true, min: 3, max: 50},
        books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
        slug: {type: String,trim: true,lowercase: true},
        createdAt: {type: Date,default: Date.now},
        updatedAt: {type: Date}
    }
)

GenreSchema.pre('validate', function (next) {
    this._slugify()
    next()
})
GenreSchema.methods = {
    _slugify() {
        this.slug = slug(this.name)
    }
}


export default mongoose.model('Genre', GenreSchema)
