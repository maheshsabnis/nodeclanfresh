// 1. use all clases
const { Sequelize, Model, DataTypes } = require('sequelize');
const mysql2 = require('mysql2/promise');




// 2. define the Database Connection
const sequelize = new Sequelize("ormapp", "root", "P@ssw0rd_", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false, //prevent the loggin on console on execution
    define: {
        // true by default. false because bydefault sequelize adds createdAt, modifiedAt 
        // columns with timestamps.if you want those columns make ths true.
        timestamps: false
    }
});

// 3. define models
class Department extends Model {}
Department.init({
    DeptNo: { type: DataTypes.INTEGER, primaryKey: true },
    DeptName: { type: DataTypes.STRING, allowNull: false },
    Location: { type: DataTypes.STRING, allowNull: false },
    Capacity: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'Department' })

class Employee extends Model {}
Employee.init({
    EmpNo: { type: DataTypes.INTEGER, primaryKey: true },
    EmpName: { type: DataTypes.STRING, allowNull: false },
    Salary: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, modelName: 'Employee' });
// 3a. Defining Associations
Department.Employees = Department.hasMany(Employee);

// 4. sync the model with the database using sequelize
sequelize.sync({ force: true })
    .then(() => {
        return Department.create({
            DeptNo: 10,
            DeptName: "IT",
            Location: "Pune",
            Capacity: 100,
            Employees: [{
                    EmpNo: 101,
                    EmpName: "Mahesh",
                    Salary: 100000
                },
                {
                    EmpNo: 102,
                    EmpName: "Tejas",
                    Salary: 400000
                }
            ]
        }, {
            include: [Department.Employees]
        });
    })
    .then((data) => {
        console.log(`Records Created ${data.toJSON()}`);
    }).catch((error) => { console.log(`Error Occured ${error}`) });