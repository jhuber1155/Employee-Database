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
        freezeTableName:true,
        underscored: true,
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
                model: 'department',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'role'
    }
);

Department.hasOne(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE',
});
Role.belongsTo(Department, {//??? Either or??
    foreignKey: 'departmet_id',
});

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
                model: 'role',
                key: 'id'
            }
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'employee'
    }
);

Role.hasOne(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
  });  //????
Employee.hasOne(Employee, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE'}); //???hasMany?


module.exports = { Department, Role, Employee };