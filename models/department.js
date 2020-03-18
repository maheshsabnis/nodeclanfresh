/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department', {
    DeptId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    DeptNo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    DeptName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Capacity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'department'
  });
};
