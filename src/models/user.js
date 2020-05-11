export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        field: 'email',
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      password: {
        field: 'password',
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      permission: {
        field: 'permission',
        type: DataTypes.STRING,
        defaultValue: 'member',
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
  return user;
};
