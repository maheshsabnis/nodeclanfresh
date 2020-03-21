const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("company", "root", "P@ssw0rd_", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        mix: 5,
        idle: 10000
    }
});

class Users extends Model {};

Users.init({
    UserId: { type: DataTypes.STRING, allowNull: false },
    UserName: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'Users' });

const users = [
    { UserId: 'User0001', UserName: 'A' },
    { UserId: 'User0002', UserName: 'B' },
    { UserId: 'User0003', UserName: 'C' },
    { UserId: 'User0004', UserName: 'D' }
];
sequelize.sync({ force: false })
    .then(() => {
        Users.bulkCreate(users, { validate: true }).then(() => {
            console.log(`${users.length} records are created`);
        });
    }).catch((error) => {
        console.log(error);
    });