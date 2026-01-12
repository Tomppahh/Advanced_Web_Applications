import express, { Express } from "express";
import path from "path";
import router from "./src/index";
import morgan from "morgan";

// Create server
const app: Express = express();
const port: number = 3000;

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
