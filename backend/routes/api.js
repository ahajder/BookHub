const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const Book = require('../books/books.json');


// Token Verification
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

// Get Books from JSON
router.get('/books', (req,res) => {
  let books = require('../books/books.json')
  res.json(books)
});


// User Register
router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

// User Login
router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({username: userData.username}, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid username')
      } else
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})



module.exports = router;
