const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const api = require('./routes/api');
const books = require('./routes/userbooks');

const port = 3000;


// Mongoose Mongo Setup
const db = 'mongodb://test:test123@ds261521.mlab.com:61521/test123';

mongoose.connect(db, { useNewUrlParser: true }, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')
    }
})


const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/api/userbooks/', books);


app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});
