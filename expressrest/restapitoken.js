const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
// using jsonwebtoken package
const jwtoken = require('jsonwebtoken');
// sequelize objects
const { Sequelize } = require('sequelize');
// define express instance
const instance = express();
// configure middlewares with express
// for cors and bosyParser
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

// the object that will contains a signeture as random string
const jwtObject = {
    'jwtSecret': 'xyzprq00700qrpzyx'
}

// define a varible that will contains the Token on server
// globally
let globalTokan;

const sequelize = new Sequelize("company", "root", "P@ssw0rd_", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        idle: 10000
    },
    define: {
        timestamps: false // omit the createdAt and updatedAt columns
    }
});

// import the model class file
const students = sequelize.import('./../models/students.js');
const users = sequelize.import('./../models/users.js');


// get/get:id/post/put/delete HTTP utility methods

// post method to create user
instance.post('/api/users/register', (request, response) => {
    sequelize.sync({ force: false })
        .then(() => users.create({
            UserName: request.body.UserName,
            Password: request.body.Password
        })).then((result) => {
            response.json({
                statucCode: 200,
                data: `User Created Successfully ${JSON.stringify(result.toJSON())}`
            });
            response.end();
        }).catch((error) => {
            response.send({
                statucCode: 500,
                data: `Error Occured ${error}`
            });
            response.end();
        });
});
// logic steps for creating Tokens based on User Identity

// 1. store the secret with express instance
// express instance will use the secret to 
// generate token whern user is authenticated
// verify token when user send toke in HTTP request
instance.set('jwtSecret', jwtObject.jwtSecret);
// 2. Authorize the user and generate token
instance.post('/api/users/authuser', (request, response) => {
    const authValue = {
        UserName: request.body.UserName,
        Password: request.body.Password
    };

    sequelize.sync({ force: false })
        .then(() => users.findByPk(authValue.UserName))
        .then((result) => {
            console.log(JSON.stringify(result));
            // 2a. if user not found response the UnAuthorized
            if (result === null) {
                response.json({ statusCode: 401, data: `User Not Found` });
                response.end();
            } else {
                if (result.Password !== authValue.Password) {
                    response.json({ statusCode: 401, data: `Un-Authenticated response Password Does not match` });
                    response.end();
                } else {
                    // 2b. Logic for issuing the token
                    let accessToken = jwtoken.sign(result.toJSON(), instance.get('jwtSecret'), {
                        expiresIn: 3600 // token will expire in 3600 seconds
                    });
                    globalTokan = accessToken;
                    console.log(`Access Token ${accessToken}`);
                    // 2c. respond token to client
                    response.send({
                        statusCode: 200,
                        authenticated: true,
                        data: accessToken
                    });
                    response.end();
                }
            }

        }).catch((error) => {
            response.json({ statusCode: 401, data: `User Not Found ${error}` });
            response.end();
        });
});



// 3. provide an access to get method only when the token is valid
instance.get('/api/students', (request, response) => {
    // do not overwrite the models
    // 3a. read the token value from authorization headers
    let header = request.headers.authorization;
    // 3b read the token value
    let token = header.split(' ')[1];
    console.log(token);
    // if (token !== globalTokan) {
    //     response.send({ statusCode: 401, data: 'Request UnAuthorized' });
    //     response.end();
    // } else
    {
        // 3c. Varify the token based on issuer using the secret key stored
        // in express object
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            // 3d. request failed because token verification failed
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                // 3e. decode the request and process it successfully
                request.decoded = decoded;
                sequelize.sync({ force: false })
                    .then(() => students.findAll()) // --> the select * from Students
                    .then((result) => {
                        response.json({ statusCode: 200, rowCount: result.length, data: result });
                        response.end();
                    }).catch((error) => {
                        response.send({ statusCode: 500, data: error });
                    });
            }
        });
    }
});

instance.get('/api/students/:id', (request, response) => {
    // read the parameter
    let id = parseInt(request.params.id);
    // do not overwrite the models
    sequelize.sync({ force: false })
        .then(() => students.findOne({ where: { StudentId: id } })) // --> the select * from Students where StudentId=id
        .then((result) => {
            if (result !== null) {
                response.json({ statusCode: 200, data: result });
                response.end();
            } else {
                response.json({ statusCode: 200, data: `Record not found` });
                response.end();
            }
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
});

instance.post('/api/students', (request, response) => {
    const student = {
        StudentId: parseInt(request.body.StudentId),
        StudentName: request.body.StudentName,
        University: request.body.University,
        Course: request.body.Course,
        Fees: parseInt(request.body.Fees)
    };
    sequelize.sync({ force: false })
        .then(() => students.create(student))
        .then((result) => {
            if (result !== null) {
                response.json({ statusCode: 200, data: JSON.stringify(result.toJSON()) });
                response.end();
            } else {
                response.json({ statusCode: 200, data: `Record is not Created` });
                response.end();
            }
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
});


instance.put('/api/students/:id', (request, response) => {
    let id = request.params.id;
    const student = {
        StudentId: parseInt(request.body.StudentId),
        StudentName: request.body.StudentName,
        University: request.body.University,
        Course: request.body.Course,
        Fees: parseInt(request.body.Fees)
    };
    sequelize.sync({ force: false })
        .then(() => students.update(student, { where: { StudentId: id } }))
        .then((result) => {
            if (result !== 0) {
                response.json({ statusCode: 200, data: result.length });
                response.end();
            } else {
                response.json({ statusCode: 200, data: `Record is not Updated` });
                response.end();
            }
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
});

instance.delete('/api/students/:id', (request, response) => {
    // read the parameter
    let id = parseInt(request.params.id);
    // do not overwrite the models
    sequelize.sync({ force: false })
        .then(() => students.destroy({ where: { StudentId: id } })) // --> the select * from Students where StudentId=id
        .then((result) => {
            if (result === 0) {
                response.json({ statusCode: 200, data: 'No Record deleted' });
                response.end();
            } else {
                response.json({ statusCode: 200, data: result });
                response.end();
            }
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
});


// listenting on the port
instance.listen(6070, () => {
    console.log('Server is listening on port 6070');
})