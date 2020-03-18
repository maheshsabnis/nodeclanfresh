// 1. load the sequalize to create model
const { Sequelize, Model, DataTypes } = require('sequelize');

// 2. load mysql connection
// p1: database, p2: username, p3: password
// p4: the server details option object
// server address, provider aka dialect
// connection pool configuration
const sequelize = new Sequelize("company", "root", "P@ssw0rd_", {
    host: 'localhost',
    dialect: 'mysql', // this is for mysql
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
// 3. define model
class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

// 4. connect to mysql using sequalize and sync the model with table by creating
// table
// "mysql://root:P@ssw0rd_@localhost/company", {
//     define: {
//         timestamps: false // true by default. false because bydefault sequelize adds createdAt, modifiedAt columns with timestamps.if you want those columns make ths true.
//     }
// }
//var employees = dbConnect.import('./../../models/employee.js');

// force parameter
sequelize.sync()
    .then(() => User.create({
        username: 'mahesh',
        birthday: new Date(1976, 7, 7)
    }))
    .then(data => {
        console.log(data.toJSON());
    });