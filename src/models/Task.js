import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Task;
};