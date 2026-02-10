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
router.get('/api/getbooks/', async (req, res) => {
    try {
        const books = await Books_1.Book.find();
        res.json(books);
    }
    catch (error) {
        console.error(`Error fetching books: ${error}`);
        res.status(500).json({ error: 'Failed to fetch book data in /api/book/ ' });
    }
});
router.get('/api/book/:name', async (req, res) => {
    try {
        const bookName = decodeURIComponent(req.params.name);
        const book = await Books_1.Book.findOne({ name: bookName });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        console.error(`Error fetching book: ${error}`);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});
exports.default = router;
