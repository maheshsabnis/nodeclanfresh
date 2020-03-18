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

// 3. use express HTTP Methods for request prceossing
// 3a. the get method for REST API, this accepts 
// URL string and the callback to process request
instance.get('/api/get', (request, response) => {
    // response.send({ statusCode: 200, data: 'Hello World' });
    response.json({ data: 'hello' }) // newer syntax
});

instance.get('/api/products', (request, response) => {
    let data = dalObj.getProducts();
    response.send({ status: 200, data: data });
});
// passing URL Parameter
instance.get('/api/products/:id', (request, response) => {
    // read the URL parameter
    let id = request.params.id;
    console.log(id);
    let data = dalObj.getProductsById(id);
    response.send({ status: 200, data: data });
});

// post the new Product

instance.post('/api/products', (request, response) => {
    // read the body and save it inh JSON object;
    let prd = {
        ProdId: request.body.ProdId,
        ProdName: request.body.ProdName,
        Price: request.body.Price
    };
    let data = dalObj.createProduct(prd);
    response.send({ status: 200, message: 'Record Created Succefully', data: data });
});


instance.put('/api/products/:id', (request, response) => {
    // read the URL parameter
    let id = request.params.id;
    // read the body and save it inh JSON object;
    let prd = {
        ProdId: request.body.ProdId,
        ProdName: request.body.ProdName,
        Price: request.body.Price
    };
    let data = dalObj.updateProduct(id, prd);
    response.send({ status: 200, message: 'Record Created Succefully', data: data });
});


instance.delete('/api/products/:id', (request, response) => {
    // read the URL parameter
    let id = request.params.id;

    let data = dalObj.deleteProduct(id, prd);
    response.send({ status: 200, message: 'Record Created Succefully', data: data });
});


// 4. listen on the port
instance.listen(5060, () => {
    console.log('Express Server Started on port 5060');
});