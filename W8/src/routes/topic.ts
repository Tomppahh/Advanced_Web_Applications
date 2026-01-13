import { Router, Response } from 'express';
import { Topic } from '../models/Topic';
import { validateToken, validateAdminToken, CustomRequest } from '../middleware/validateToken';

const router: Router = Router();

router.get('/topics', async (req: CustomRequest, res: Response) => {
	try {
		const topics = await Topic.find();
		return res.status(200).json(topics);
	} catch (error: any) {
		console.error(`Error fetching topics: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/topic', validateToken, async (req: CustomRequest, res: Response) => {
	try {
		const newTopic = new Topic({
			title: req.body.title,
			content: req.body.content,
			username: req.user?.username,
		});

		await newTopic.save();
		return res.status(200).json(newTopic);
	} catch (error: any) {
		console.error(`Error creating topic: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.delete('/topic/:id', validateAdminToken, async (req: CustomRequest, res: Response) => {
	try {
		await Topic.findByIdAndDelete(req.params.id);
		return res.status(200).json({ message: 'Topic deleted successfully.' });
	} catch (error: any) {
		console.error(`Error deleting topic: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default router;
