// 1. use all clases

const { Sequelize, Model, DataTypes } = require('sequelize');

// 2. define the Database Connection
const sequelize = new Sequelize("company", "root", "P@ssw0rd_", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// 3. define models
class Employees extends Model {};
// 3a. Model Schema
Employees.init({
    EmpNo: DataTypes.INTEGER,
    EmpName: DataTypes.STRING,
    Salary: DataTypes.INTEGER
}, { sequelize, modelName: 'NewEmployee' });


// 4. sync the model with the database using sequelize
sequelize.sync()
    .then(() =>
        Employees.create({ EmpNo: 101, EmpName: 'Mahesh', Salary: 120000 })
    )
    .then((data) => {
        console.log(data.toJSON());
    }).catch((error) => { console.log(`Error Occured ${error}`) });