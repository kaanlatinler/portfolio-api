module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    }
  );
  return Users;
};
