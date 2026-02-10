import { Router, Response, Request } from 'express';
import { Book } from '../models/Books';

const router: Router = Router();

router.post('/api/book', async (req, res: Response) => {
	try {
		const newBook = new Book({
			name: req.body.name,
			author: req.body.author,
			pages: req.body.pages,
		});
		await newBook.save();
		res.status(201).json(newBook);
	} catch (error) {
		console.error(`Error creating topic: ${error}`);
		res.status(500).json({ error: 'Failed to create book' });
	}
});

router.get('/api/getbooks/', async (req: Request, res: Response) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (error) {
		console.error(`Error fetching books: ${error}`);
		res.status(500).json({ error: 'Failed to fetch book data in /api/book/ ' });
	}
});

router.get('/api/book/:name', async (req: Request, res: Response) => {
	try {
		const bookName = decodeURIComponent(req.params.name);
		const book = await Book.findOne({ name: bookName });
		if (!book) {
			return res.status(404).json({ error: 'Book not found' });
		}
		res.json(book);
	} catch (error) {
		console.error(`Error fetching book: ${error}`);
		res.status(500).json({ error: 'Failed to fetch book' });
	}
});

export default router;
