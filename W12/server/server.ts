import express, { Express, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRouter from './src/routes/book';
import cors, { CorsOptions } from 'cors';

// Dotenv config
dotenv.config();

// Create server
const app: Express = express();
const port: number = parseInt(process.env.PORT as string) || 3001;

// CORS
if (process.env.NODE_ENV === 'development') {
	const corsOptions: CorsOptions = {
		origin: 'http://localhost:3000',
		optionsSuccessStatus: 200,
	};
	app.use(cors(corsOptions));
} else if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, '../../client/dist')));
	app.get('*', (req: Request, res: Response) => {
		res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
	});
}

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/data', express.static(path.join(__dirname, '../data')));

// Routes
app.use(bookRouter);

// MongoDB connection
const mongoDB: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';
mongoose
	.connect(mongoDB)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error(`Error connecting to MongoDB: ${error}`);
	});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
