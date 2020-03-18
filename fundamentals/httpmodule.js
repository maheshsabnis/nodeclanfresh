const http = require('http');


const Emp = [
    { EmpNo: 101, EmpName: 'A' },
    { EmpNo: 102, EmpName: 'B' },
    { EmpNo: 103, EmpName: 'C' },
    { EmpNo: 104, EmpName: 'D' }
];

// let server = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write('Hello Client');
//     response.end();
// });

// let server = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.write(JSON.stringify(Emp));
//     response.end();
// });


let server = http.createServer((request, response) => {
    let url = request.url;
    if (url === '/101') {
        console.log(url.charAt(1));
        response.writeHead(200, { 'Content-Type': 'application/json' });
        let data = Emp.filter((e, i) => {
            return e.EmpNo === 101
        })
        response.write(JSON.stringify(data));
    }

    response.end();
});

server.listen(5060);
console.log('Server Stared on port 5060');