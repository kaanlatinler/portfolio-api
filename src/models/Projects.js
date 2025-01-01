module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define("Projects", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        client: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        project_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Categories",
            key: "id",
          },
        },
        language_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Languages",
            key: "id",
          },
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
    });
    return Projects;
};