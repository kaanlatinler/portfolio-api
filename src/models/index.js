const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Users = require("./Users")(sequelize, DataTypes);
const Categories = require("./Categories")(sequelize, DataTypes);
const Languages = require("./Languages")(sequelize, DataTypes);
const Projects = require("./Projects")(sequelize, DataTypes);
const Contacts = require("./Contacts")(sequelize, DataTypes);

Projects.belongsTo(Categories, { foreignKey: "category_id" });
Projects.belongsTo(Languages, { foreignKey: "language_id" });

module.exports = {
  Users,
  Categories,
  Languages,
  Projects,
  Contacts,
};
