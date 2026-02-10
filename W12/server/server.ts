import express, { Express } from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';

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

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
