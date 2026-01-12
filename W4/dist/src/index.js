"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const dataFile = path_1.default.join(__dirname, "../../data.json");
let users = [];
// Function to read data from file
const readDataFromFile = () => {
    if (fs_1.default.existsSync(dataFile)) {
        const data = fs_1.default.readFileSync(dataFile, "utf8");
        users = JSON.parse(data);
    }
    else {
        users = [];
    }
};
// Function to write data to file
const writeDataToFile = () => {
    fs_1.default.writeFileSync(dataFile, JSON.stringify(users, null, 2));
};
// Initialize data from file
readDataFromFile();
router.post("/add", (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo.trim();
    if (!name) {
        res.status(400).json({ message: "Name is required." });
        return;
    }
    let user = users.find(u => u.name === name);
    if (user) {
        if (todo && !user.todos.includes(todo)) {
            user.todos.push(todo);
        }
    }
    else {
        users.push({ name, todos: todo ? [todo] : [] });
    }
    writeDataToFile();
    res.json({ message: `Todo added successfully for user ${name}.` });
});
router.get("/todos/:id", (req, res) => {
    const name = req.params.id;
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (user) {
        res.json(user.todos);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
router.delete("/delete", (req, res) => {
    const name = req.body.name;
    const userIndex = users.findIndex(u => u.name === name);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        writeDataToFile();
        res.json({ message: "User deleted successfully." });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
router.put("/update", (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo.trim();
    const user = users.find(u => u.name === name);
    if (user) {
        const todoIndex = user.todos.indexOf(todo);
        if (todoIndex !== -1) {
            user.todos.splice(todoIndex, 1);
            writeDataToFile();
            res.json({ message: "Todo deleted successfully." });
        }
        else {
            res.status(404).json({ message: "Todo not found" });
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
exports.default = router;
