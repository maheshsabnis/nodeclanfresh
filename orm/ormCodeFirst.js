// 1. use all clases

const { Sequelize, Model, DataTypes } = require('sequelize');

// 2. define the Database Connection
const sequelize = new Sequelize("ormapp", "root", "P@ssw0rd_", {
    host: 'localhost', // host of the relationsl Database
    dialect: 'mysql', // provider
    pool: {
        max: 5, // max pools
        min: 0, // min pools default is 0
        idle: 10000 // connection idle time befote it is trelease
    }
});

// 3. define models
class Employees extends Model {};
// 3a. Model Schema
Employees.init({
    EmpNo: { type: DataTypes.INTEGER, primaryKey: true },
    EmpName: { type: DataTypes.STRING, allowNull: false },
    Salary: { type: DataTypes.INTEGER, allowNull: false },
    Designation: { type: DataTypes.STRING }
}, { sequelize, modelName: 'NewEmployee' });


// 4. sync the model with the database using sequelize
sequelize.sync({ force: false })
    .then(() =>
        Employees.create({ EmpNo: 101, EmpName: 'Mahesh', Salary: 120000, Designation: 'Manager' })
    )
    .then((data) => {
        console.log(data.toJSON());
    }).catch((error) => { console.log(`Error Occured ${error}`) });