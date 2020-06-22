import models from "../config/mariadb.config";

export default (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        field: "title",
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      contents: {
        field: "contents",
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      force: true,
    }
  );

  Board.associate = (models) => {
    models.Board.belongsTo(models.User, {
      foreignKey: { name: "userHash", field: "userHash", allowNull: false },
      targetKey: "hash",
      onDelete: "NO ACTION",
    });

    models.Board.hasMany(models.Comment, {
      foreignKey: { name: "postId", field: "postId", allowNull: false },
      sourceKey: "id",
      onDelete: "No ACTION",
    });
  };

  return Board;
};
