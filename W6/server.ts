import express, { Express } from "express";
import path from "path";
import router from "./src/routes/index";
import morgan from "morgan";
import mongoose, { Connection } from 'mongoose'
// Create server
const app: Express = express();
const port: number = 3000;

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/data", express.static(path.join(__dirname, "../data")));
app.use("/", router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
