const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.post('/', function (req, res) {
    res.send("This is a post request");
});

app.listen(process.env.PORT || 3000);