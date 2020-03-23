const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
// sequelize objects
const { Sequelize } = require('sequelize');
// define express instance
const instance = express();
// configure middlewares with express
// for cors and bosyParser
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

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

// get/get:id/post/put/delete HTTP utility methods

instance.get('/api/students', (request, response) => {
    // do not overwrite the models
    sequelize.sync({ force: false })
        .then(() => students.findAll()) // --> the select * from Students
        .then((result) => {
            response.json({ statusCode: 200, rowCount: result.length, data: result });
            response.end();
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
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