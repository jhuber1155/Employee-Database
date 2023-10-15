// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const Department = require('./Database');

// class Role extends Model {}

// Role.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//         },
//         title: {
//             type: DataTypes.STRING(30)
//         },
//         salary: {
//             type: DataTypes.DECIMAL
//         },
//         department_id: {
//             type: DataTypes.INTEGER,
//             references: Department,
//             referencesKey: id
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         underscored: true,
//         freezeTableName:true,
//         modelName: 'role'
//     }
// );

// Department.hasOne(id);

// module.exports = Role;