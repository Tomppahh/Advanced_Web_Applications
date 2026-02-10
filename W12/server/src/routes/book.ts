import { Router, Response } from 'express';
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

export default router;
