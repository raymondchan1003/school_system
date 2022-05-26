module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      studentMail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return Student;
};
