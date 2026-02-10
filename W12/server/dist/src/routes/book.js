"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Books_1 = require("../models/Books");
const router = (0, express_1.Router)();
router.post('/api/book', async (req, res) => {
    try {
        const newBook = new Books_1.Book({
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages,
        });
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error(`Error creating topic: ${error}`);
        res.status(500).json({ error: 'Failed to create book' });
    }
});
exports.default = router;
