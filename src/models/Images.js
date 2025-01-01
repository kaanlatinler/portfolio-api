module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Projects',
            key: 'id'
          }
        },
    });
    return Images;
};