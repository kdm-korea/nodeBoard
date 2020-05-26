export default (sequelize, DataTypes) => {
  const board = sequelize.define(
    'Board',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      hash: {
        field: 'hash',
        type: DataTypes.STRING,
        unique: true,
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
      timestamps: true,
      force: true,
    }
  );
  return board;
};
