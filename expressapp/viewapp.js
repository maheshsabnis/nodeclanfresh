const express = require('express');
// the 'path' module to read local files
const path = require('path');

let instance = express();

// define the route object
// define routing for Views
let route = express.Router();
console.log(__dirname); // global object for server working directory
// use route for views
route.get("/home", (request, response) => {
    response.sendFile('home.html', { root: path.join(__dirname, './../views') });
});


// configure the route with express instance
instance.use(route);

instance.listen(5061, () => {
    console.log('started listining on 5061');
});