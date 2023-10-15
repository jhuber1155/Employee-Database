// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const Role = require('./Role');

// class Employee extends Model {}

// Employee.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true
//         },
//         firstName: {
//             type: DataTypes.STRING(30)
//         },
//         lastName: {
//             type: DataTypes.STRING(30)
//         },
//         role_id: {
//             type: DataTypes.INTEGER,
//             references: Role,
//             referencesKey: id
//         },
//         manager_id: {
//             type: DataTypes.INTEGER,
//             references: Employee,
//             referencesKey: id
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         underscored: true,
//         freezeTableName:true,
//         modelName: 'employee'
//     }
// );

// Department.hasOne(id);

// module.exports = Role;