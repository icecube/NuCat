const app = require('./src/App');
const http = require('http');

http.createServer(app).listen(process.env.PORT);