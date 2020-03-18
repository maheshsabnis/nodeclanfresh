const http = require('http');

const serverOptions = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path: '/api/Products',
    method: 'GET' //POST/PUT/DELETE
};


function getData() {
    let products = [];
    http.request(serverOptions, (res) => {
        res.setEncoding('utf-8');
        res.on('data', function(data) {
            products = JSON.parse(data);
            products.forEach((p, i) => {
                console.log(JSON.stringify(p));
            });
        });
    }).end();
}

getData();

const prd = JSON.stringify({
    ProductId: "Prd0007",
    ProductName: "Mug",
    Manufacturer: "Bajaj",
    CategoryName: "Cutlary",
    Description: "Hot Drink",
    BasePrice: 2000
});
console.log(prd.length);
const serverOptionsPost = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path: '/api/Products',
    method: 'POST', //POST/PUT/DELETE
    headers: {
        "Content-Type": "application/json",
        'Content-Length': prd.length
    }
};

function postData() {

    var reqPost = http.request(serverOptionsPost, function(res) {
        console.log("response statusCode: ", res.statusCode);
        res.on('data', function(data) {
            console.log('Posting Result:\n');
            process.stdout.write(data);
            console.log('\n\nPOST Operation Completed');
        });
    });

    reqPost.write(prd); // write data in request   
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });

}

postData();