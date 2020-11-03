const app = require('./src/index');
const http = require('http');

http.createServer(app).listen(process.env.PORT || 3000);