// creating data class
class SimpleDataClass {
    constructor() {
        this.products = [];
        this.products.push({ ProdId: 101, ProdName: 'P1', Price: 1000 });
        this.products.push({ ProdId: 102, ProdName: 'P2', Price: 11000 });
        this.products.push({ ProdId: 103, ProdName: 'P3', Price: 1300 });
    }

    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        console.log('In Method ' + id);

        let data = this.products.filter((p, i) => { return p.ProdId === parseInt(id) });
        console.log(JSON.stringify(data));
        return data;
    }

    createProduct(prd) {
        // console.log(`In Method ${JSON.stringify(prd)}`)
        this.products.push(prd);
        return this.products;
    }

    updateProduct(id, prd) {
        // logic for update, (your headache)
    }
    deleteProduct(id) {
        // logic for update, (your headache)
    }
}

// exporing the class as Node.js module, it will be loaded using require('./The File')
module.exports = SimpleDataClass;