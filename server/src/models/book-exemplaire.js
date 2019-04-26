import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BookExemplaireSchema = new Schema(
    {
      book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference au livre associé
      status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
      due_back: {type: Date, default: Date.now},
      createdAt: {type: Date,default: Date.now},
      updatedAt: {type: Date}
    }
  );

export default mongoose.model('BookExemplaire', BookExemplaireSchema)
