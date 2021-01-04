//jshint esversion:6
// .env should be added to .gitignore
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const db = require('./db')
const eventRouter = require('./routes/event-router')

const app = express();
const port = process.env.PORT || 3000;
const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

app.use(express.static(CLIENT_BUILD_PATH));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/app', function (req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});
app.get('/app/*', function (req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.get('/', function (req, res) {
    // res.redirect('/app')
    res.send("Hello world")
})

app.use('/api', eventRouter)

app.listen(port, function () {
    console.log(`Server started on port 3000 or on port: ${port}`);
})