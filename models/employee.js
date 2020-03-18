/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    EmpId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    EmpNo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    EmpName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Salary: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    DeptId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'department',
        key: 'DeptId'
      }
    }
  }, {
    tableName: 'employee'
  });
};
