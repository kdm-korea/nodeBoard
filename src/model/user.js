const {Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mariadb::memory:');

class User extends Model{}
User.init({
    username: DataTypes.STRING,
    age: DataTypes.INTEGER
}, {sequelize, modelName: 'user'});