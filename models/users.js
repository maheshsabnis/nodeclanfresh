/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    Password: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
