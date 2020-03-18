const http = require('http');
const fs = require('fs');
let server = http.createServer((request, response) => {
    if (request.url === '/home') {
        fs.readFile('./../views/home.html', (error, data) => {
            if (error) {
                response.writeHead(401, { 'Content-Type': 'text/html' });
                response.write(error.message);
                response.end();
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    } else {
        response.writeHead(401, { 'Content-Type': 'text/html' });
        response.write('File Not Found');
        response.end();
    }
});

server.listen(5060);
console.log('Listening on Port 5060');