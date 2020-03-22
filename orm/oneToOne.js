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

class Location extends Model {}
Location.init({
    LocationId: { type: DataTypes.INTEGER, primaryKey: true },
    LocationName: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'Location' });

class Department extends Model {}
Department.init({
    DeptNo: { type: DataTypes.INTEGER, primaryKey: true },
    DeptName: { type: DataTypes.STRING, allowNull: false },
    LocationId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'Department' });

Location.Department = Location.hasOne(Department, {
    foreignKey: 'LocationId',
    constraints: true
});
// Department.belongsTo(Location);

sequelize.sync({ force: true })
    .then(() =>
        Location.create({
            LocationId: 101,
            LocationName: 'Pune',
            Department: {
                DeptNo: 1001,
                DeptName: 'IT'
            }
        }, {
            include: Location.Department
        })
    ).then((result) => { console.log(`Created ${JSON.stringify(result.toJSON())}`); })
    .catch((error) => { console.log(`Error ${error}`) });