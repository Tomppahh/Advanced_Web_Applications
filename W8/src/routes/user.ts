import { Request, Response, Router } from 'express';
import { body, Result, ValidationError, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = Router();

router.post(
	'/register',
	body('email').trim().isLength({ min: 3 }),
	body('password').isLength({ min: 4 }),
	body('username').isLength({ min: 4 }),
	body('isAdmin').isLength({ min: 4 }),
	async (req: Request, res: Response) => {
		const errors: Result<ValidationError> = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const existingUser = await User.findOne({ email: req.body.email });
			if (existingUser) {
				return res.status(403).json({ message: 'Email already exists' });
			}

			const salt: string = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS || '6'));
			const hash: string = bcrypt.hashSync(req.body.password, salt);

			const newUser = new User({
				email: req.body.email,
				password: hash,
				username: req.body.username,
				isAdmin: req.body.isAdmin,
			});

			await newUser.save();

			return res.status(200).json({
				email: newUser.email,
				password: newUser.password,
				username: newUser.username,
				isAdmin: newUser.isAdmin,
			});
		} catch (error: any) {
			console.error(`Error during registration: ${error}`);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);

router.post('/login', body('email').trim().isLength({ min: 3 }), body('password').isLength({ min: 4 }), async (req: Request, res: Response) => {
	const errors: Result<ValidationError> = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const match = bcrypt.compareSync(req.body.password, user.password);
		if (!match) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'default-secret');
		return res.status(200).json({ token: token });
	} catch (error: any) {
		console.error(`Error during login: ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});
router.get('/list', async (req: Request, res: Response) => {
	try {
		const users = await User.find({}, { password: 0 });
		return res.status(200).json(users);
	} catch (error: any) {
		console.log(`Error while fetching users ${error}`);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default router;
