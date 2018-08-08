const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('../models/book');



router.route('/books').get((req, res) => {
    Book.find((err, books) => {
        if (err)
            console.log(err);
        else
            res.json(books);
    });
});

router.route('/books/:id').get((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err)
            console.log(err);
        else
            res.json(book);
    });
});

router.route('/books/add').post((req, res) => {
    let book = new Book(req.body);
    book.save()
        .then(book => {
            res.status(200).json({'book': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/books/update/:id').post((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (!book)
            return next(new Error('Could not load document'));
        else {
            book.title = req.body.title;
            book.description = req.body.title;
            book.author = req.body.author;

            book.save().then(book => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/books/delete/:id').get((req, res) => {
    Book.findByIdAndRemove({_id: req.params.id}, (err, book) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

module.exports = router;
