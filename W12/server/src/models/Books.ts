import mongoose, { Date, Document, Schema } from 'mongoose';

interface IBook extends Document {
	name: string;
	author: string;
	pages: number;
}

const BookSchema: Schema = new Schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	pages: { type: String, required: true },
});

const Book: mongoose.Model<IBook> = mongoose.model<IBook>('Book', BookSchema);

export { Book, IBook };
