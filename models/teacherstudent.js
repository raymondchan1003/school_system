module.exports = (sequelize, DataTypes) => {
  const TeacherStudent = sequelize.define("teacherstudent", {
    teacherStudentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return TeacherStudent;
};
