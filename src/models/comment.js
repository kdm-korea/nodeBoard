import models from "./../config/mariadb.config";

export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

  Comment.associate = (models) => {
    models.Comment.belongsTo(models.Board, {
      foreignKey: { name: "postId", field: "postId", allowNull: false },
      targetKey: "id",
      onDelete: "NO ACTION",
    });

    models.Comment.belongsTo(models.User, {
      foreignKey: { name: "userHash", field: "userHash", allowNull: false },
      targetKey: "hash",
      onDelete: "NO ACTION",
    });
  };

  return Comment;
};
