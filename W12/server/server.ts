import express, { Express } from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRouter from './src/routes/book';

// Dotenv config
dotenv.config();

// Create server
const app: Express = express();
const port: number = parseInt(process.env.PORT as string) || 3001;

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
