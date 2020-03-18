// creating data class
class SimpleDataClass {
    constructor() {
        this.products = [];
        this.products.push({ ProdId: 101, ProdName: 'P1', Price: 1000 });
        this.products.push({ ProdId: 102, ProdName: 'P2', Price: 11000 });
        this.products.push({ ProdId: 103, ProdName: 'P3', Price: 1300 });
    }
    getProducts = (request, response) => {
        let data = this.products;
        console.log(data);
        response.send({ statusCode: 200, data: data });
    }

    getProductsById = (request, response) => {
        let id = request.params.id;
        let data = this.products.filter((p, i) => { return p.ProdId === parseInt(id) });
        response.send({ statusCode: 200, data: data });
    }

    createProduct = (request, response) => {
        // read the body and save it inh JSON object;
        let prd = {
            ProdId: request.body.ProdId,
            ProdName: request.body.ProdName,
            Price: request.body.Price
        };
        this.products.push(prd);
        response.send({ status: 200, message: 'Record Created Succefully', data: this.products });
    }

    updateProduct = (request, response) => {
        // read the URL parameter
        let id = request.params.id;
        // read the body and save it inh JSON object;
        let prd = {
            ProdId: request.body.ProdId,
            ProdName: request.body.ProdName,
            Price: request.body.Price
        };
        // logic for update
        response.send({ status: 200, message: 'Record Created Succefully', data: this.products });
    }
    deleteProduct = (request, response) => {
        // read the URL parameter
        let id = request.params.id;
        // logic for delete
        response.send({ status: 200, message: 'Record Created Succefully', data: this.products });
    }
}

// exporing the class as Node.js module, it will be loaded using require('./The File')
module.exports = SimpleDataClass;