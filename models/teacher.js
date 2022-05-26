module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("teacher", {
    teacherMail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Teacher;
};
