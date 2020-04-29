export default (sequelize, DataTypes) => {
  const board = sequelize.define(
    'Board',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        field: 'title',
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      contents: {
        field: 'contents',
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'Board',
    }
  );
  return board;
};
