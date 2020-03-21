// 1. use all clases

const { Sequelize, Model, DataTypes } = require('sequelize');

// 2. define the Database Connection
const sequelize = new Sequelize("ormapp", "root", "P@ssw0rd_", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        // true by default. false because bydefault sequelize adds createdAt, modifiedAt 
        // columns with timestamps.if you want those columns make ths true.
        timestamps: false
    }
});
class Product extends Model {}
Product.init({
    title: Sequelize.STRING
}, { sequelize, modelName: 'product' });
class User extends Model {}
User.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
}, { sequelize, modelName: 'user' });
class Address extends Model {}
Address.init({
    type: DataTypes.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
}, { sequelize, modelName: 'address' });

// We save the return values of the association setup calls to use them later
Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
// Also works for `hasOne`

// 4. sync the model with the database using sequelize
sequelize.sync({ force: true })
    .then(() => {
        return Product.create({
            title: 'Chair',
            user: {
                firstName: 'Mick',
                lastName: 'Broadstone',
                addresses: [{
                    type: 'home',
                    line1: '100 Main St.',
                    city: 'Austin',
                    state: 'TX',
                    zip: '78704'
                }]
            }
        }, {
            include: [{
                association: Product.User,
                include: [User.Addresses]
            }]
        });
    })
    .then((data) => {
        console.log(`Records Created ${data.toJSON()}`);
    }).catch((error) => { console.log(`Error Occured ${error}`) });