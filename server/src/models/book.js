import mongoose from 'mongoose'
import slug from 'slug'

const Schema = mongoose.Schema

const BookSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        author: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
        date_publication: {type: Date},
        summary: {type: String, required: true},
        slug: {type: String,trim: true,lowercase: true},
        views: {type: Number, default: 0},
        genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
        cover: String,
        epub: String,
        pdf: String,
        createdAt: {type: Date,default: Date.now},
        updatedAt: {type: Date}
    }
)

BookSchema.pre('validate', function (next) {
    this._slugify()
    next()
})
BookSchema.methods = {
    _slugify() {
        this.slug = slug(this.title)
    }
}

export default mongoose.model('Book', BookSchema)
