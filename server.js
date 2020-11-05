//jshint esversion:6
// .env should be added to .gitignore
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate")
const db = require('./server/db')
const eventRouter = require('./server/routes/event-router')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// app.post('/', function (req, res) {
//     res.send("This is a post request");
// });

app.use('/api', eventRouter)

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
})