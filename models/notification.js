module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("notification", {
    notificationMsg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Notification;
};
