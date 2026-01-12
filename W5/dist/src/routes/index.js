"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const users_1 = __importDefault(require("../../data/users"));
const router = (0, express_1.Router)();
router.post("/add", async (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo.trim();
    let user = await User_1.User.findOne({ name: name });
    if (user) {
        user.todos.push({ todo: todo, checked: false });
        await user.save();
    }
    else {
        const newUser = new User_1.User({ name: name, todos: [{ todo: todo, checked: false }] });
        await newUser.save();
    }
    res.json({ message: "Todo added" });
});
router.get("/api/users", async (req, res) => {
    try {
        const users = await User_1.User.find();
        if (!users || users.length === 0) {
            res.status(404).json({ message: "No users found" });
            return;
        }
        res.json(users);
    }
    catch (error) {
        console.log(`Error while fetching users: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/todos/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User_1.User.findOne({ name: id });
    if (user) {
        res.json(user.todos);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
router.delete("/delete", async (req, res) => {
    const name = req.body.name;
    await User_1.User.deleteOne({ name: name });
    res.json({ message: "User deleted" });
});
router.put("/update", async (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo.trim();
    const user = await User_1.User.findOne({ name: name });
    if (user) {
        user.todos = user.todos.filter((t) => t.todo !== todo);
        await user.save();
        res.json({ message: "Todo deleted successfully." });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
router.put("/updateTodo", async (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo;
    const checked = req.body.checked;
    const user = await User_1.User.findOne({ name: name });
    if (user) {
        const todoItem = user.todos.find((t) => t.todo === todo);
        if (todoItem) {
            todoItem.checked = checked;
            await user.save();
            res.json({ message: "Todo updated" });
        }
        else {
            res.status(404).json({ message: "Todo not found" });
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
router.get("/api/users/populate", async (req, res) => {
    for (let i = 0; i < users_1.default.length; i++) {
        const user = new User_1.User({
            name: users_1.default[i].name,
            todos: users_1.default[i].todos
        });
        await user.save();
    }
    console.log("Database populated");
    res.json({ Message: "Database populated" });
});
exports.default = router;
