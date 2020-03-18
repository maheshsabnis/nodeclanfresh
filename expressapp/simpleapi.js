// 1. load required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// 1a. Load the Custom Node Module
const dalModule = require('./../models/simpledal');

// 1b. instantiate the class from the custom module
const dalObj = new dalModule();

// 2. define an express instance
let instance = express();
// 2a. configure the express instance to parse the request body
// for the post request and map with JSON
// do this by configuring the bodyParser middleware
instance.use(bodyParser.json());
// also use the URL Parameter encoding this will be used for put and delete requests
instance.use(bodyParser.urlencoded({ extended: false }));
// configure cors middleware for the instance to accept
// requests from any origin
instance.use(cors())

// 3. use express HTTP Methods for request prceossing
// 3a. the get method for REST API, this accepts 
// URL string and the callback to process request
instance.get('/api/get', (request, response) => {
    console.log(`Auth Headers ${request.headers.authorization}`);
    // split the header value with blankspace and then on :
    let authValue = request.headers.authorization.split(' ')[1].split(':');
    console.log(`Auth Value ${authValue}`);
    // response.send({ statusCode: 200, data: 'Hello World' });
    if (authValue[0] === 'mahesh' && authValue[1] === 'mahesh') {
        response.json({ data: 'hello' }) // newer syntax
    }
    response.statusCode = 401; // respond unauthorized
    response.send({ statusCode: response.statusCode, data: 'UnAuthorized' });
});

instance.get('/api/products', dalObj.getProducts);
// passing URL Parameter
instance.get('/api/products/:id', dalObj.getProductsById);

// post the new Product

instance.post('/api/products', dalObj.createProduct);


instance.put('/api/products/:id', dalObj.updateProduct);


instance.delete('/api/products/:id', dalObj.deleteProduct);


// 4. listen on the port
instance.listen(5060, () => {
    console.log('Express Server Started on port 5060');
});