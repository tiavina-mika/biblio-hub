import mongoose from 'mongoose'
import slug from 'slug'

const Schema = mongoose.Schema

const BookSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
        date_publication: {type: String, max: 75},
        summary: {type: String, required: true},
        slug: {type: String,trim: true,lowercase: true},
        views: {type: Number, default: 0},
        newComment: {type: Number, default: 0},
        publish: {type: Boolean, default: false},
        member: {type: Boolean, default: false},
        genres: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
        comments: [{
            text: String,
            checked: {type: Boolean, default: false},
            createdAt: { type: Date, default: Date.now },
            postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
        }],
        photo: {
            data: Buffer,
            contentType: String
        },
        epub: {
            data: Buffer,
            contentType: String,
            size: Number
        },
        pdf: {
            data: Buffer,
            contentType: String,
            size: Number
        },
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
