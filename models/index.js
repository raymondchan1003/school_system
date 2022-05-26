const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    define: {
      freezeTableName: true,
    },
  }
);

const Teacher = require("./teacher")(sequelize, Sequelize.DataTypes);
const Student = require("./student")(sequelize, Sequelize.DataTypes);
const Notification = require("./notification")(sequelize, Sequelize.DataTypes);
const TeacherStudent = require("./teacherstudent")(
  sequelize,
  Sequelize.DataTypes
);
const StudentNotification = require("./studentNotification")(
  sequelize,
  Sequelize.DataTypes
);

Teacher.belongsToMany(Student, {
  through: TeacherStudent,
});
Student.belongsToMany(Teacher, {
  through: TeacherStudent,
});
Notification.belongsToMany(Student, {
  through: StudentNotification,
});
Student.belongsToMany(Notification, {
  through: StudentNotification,
});
Teacher.hasMany(Notification);
Notification.belongsTo(Teacher);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Teacher = Teacher;
db.models.Student = Student;
db.models.TeacherStudent = TeacherStudent;
db.models.Notification = Notification;
db.models.StudentNotification = StudentNotification;
db.Op = Op;

module.exports = db;
