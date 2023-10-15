const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Department extends Model {}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName:true,
        modelName: 'department'
    }
);

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(30)
        },
        salary: {
            type: DataTypes.DECIMAL
        },
        department_id: {
            type: DataTypes.INTEGER,
            references: { 
                model: Department,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName:true,
        modelName: 'role'
    }
);

Department.hasOne(Role);

class Employee extends Model {}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(30)
        },
        lastName: {
            type: DataTypes.STRING(30)
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'id'
            }
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName:true,
        modelName: 'employee'
    }
);

Role.hasOne(Employee);  //????
Employee.hasOne(Employee); //???hasMany?


module.exports = { Department, Role, Employee };