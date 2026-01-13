import { Request, Response, Router } from 'express';
import { body, Result, ValidationError, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import dotenv from 'dotenv';
import { registerValidator, passwordValidator } from '../validators/inputValidation';

dotenv.config();

const router: Router = Router();

router.post(
	'/register',
	registerValidator('email').isEmail(),
	registerValidator('username').isLength({ min: 3, max: 25 }),
	passwordValidator('password'),
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

			const salt: string = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS as string));
			const hash: string = bcrypt.hashSync(req.body.password, salt);

			const newUser = new User({
				email: req.body.email,
				password: hash,
				username: req.body.username,
				isAdmin: req.body.isAdmin,
			});

			await newUser.save();

			return res.json(newUser);
		} catch (error: any) {
			console.error(`Error during registration: ${error}`);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);

router.post(
	'/login',
	registerValidator('email').isEmail(),
	registerValidator('username').isLength({ min: 3, max: 25 }),
	passwordValidator('password'),
	async (req: Request, res: Response) => {
		const errors: Result<ValidationError> = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			const match = bcrypt.compareSync(req.body.password, user.password);
			if (!match) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			const payload = {
				_id: user._id,
				username: user.username,
				isAdmin: user.isAdmin,
			};
			console.log(payload);
			const token = jwt.sign(payload, process.env.SECRET as string);
			return res.status(200).json({ token: token });
		} catch (error: any) {
			console.error(`Error during login: ${error}`);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);
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
