import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProfileSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        photo: {
            data: Buffer,
            contentType: String
        },
        createdAt: {type: Date,default: Date.now},
        updatedAt: {type: Date}
    }
)

export default mongoose.model('Profile', ProfileSchema)
