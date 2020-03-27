const products = [
    { ProdId: 101, ProdName: 'P1', Price: 1000 },
    { ProdId: 102, ProdName: 'P2', Price: 11000 },
    { ProdId: 103, ProdName: 'P3', Price: 1300 }
];

// require all the dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const apiServer = require('./../expressapp/simpleapi');
// should perform HTTP Calls and check for assertions on resopnse
const should = chai.should();
// configure the HTTP calls for chai object model
chai.use(chaiHttp);

// start the GET route testing
describe("/GET products", () => {
    // done, the callback managed by chai to complete
    // the response
    it("it should return all producs", (done) => {
        // check for the server running (api service)
        chai.request(apiServer)
            // make the call
            .get('/api/products')
            // receive the response upon the call is completed
            .end((error, response) => {
                response.should.have.status(200);
                response.body.data.should.be.a('array');
                //response.body.should.be.a();
                done();
            });
    });
});