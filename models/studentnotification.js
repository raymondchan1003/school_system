module.exports = (sequelize, DataTypes) => {
  const StudentNotification = sequelize.define("studentnotification", {
    studentNotificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return StudentNotification;
};
