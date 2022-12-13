const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Data = require("./data")(sequelize, Sequelize);
module.exports = db;
