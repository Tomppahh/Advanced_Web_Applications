"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.get("/hello", (req, res) => {
    res.json({ msg: "Hello world!" });
});
app.get("/echo/:id", (req, res) => {
    const id = req.params.id;
    res.json({ id: id });
    console.log("User id: ", id);
});
app.post("/sum", (req, res) => {
    let summa = 0;
    const numbers = req.body.numbers;
    numbers.forEach((number) => {
        summa += number;
    });
    res.json({ sum: summa });
    console.log("Sum: ", summa);
});
let users = [];
app.post("/users", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    // lippu käyttäjälle, ettei ole vielä listassa
    let userExists = false;
    // onko uusi lisättävä käyttäjä listassa
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name && users[i].email === email) {
            userExists = true;
            break;
        }
    }
    // Jos ei, lisätään listaan.
    if (!userExists) {
        const newUser = { name, email };
        users.push(newUser);
        console.log("New user added:", newUser);
        res.status(200).json({ message: "User successfully added" });
    }
    else {
        console.log("User", name, email, "already in database.");
        res.status(200).json({ message: "User already exists" });
    }
});
// lähetetään käyttäjälista takaisin frontendille
app.get("/users", (req, res) => {
    res.status(201);
    res.json({ users: users });
});
