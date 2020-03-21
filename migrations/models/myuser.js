'use strict';
module.exports = (sequelize, DataTypes) => {
  const MyUser = sequelize.define('MyUser', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  MyUser.associate = function(models) {
    // associations can be defined here
  };
  return MyUser;
};