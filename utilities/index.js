const {
  models: { Teacher, Student, Notification },
} = require("../models");

const findTeacher = (mail) => {
  return Teacher.findOne({
    where: {
      teacherMail: mail,
    },
  });
};

const findOrCreateTeacher = (mail) => {
  return Teacher.findOrCreate({
    where: {
      teacherMail: mail,
    },
  });
};

const findOrCreateStudent = (mail) => {
  return Student.findOrCreate({
    where: {
      studentMail: mail,
    },
    paranoid: false,
  });
};

const findStudent = (mail) => {
  return Student.findOne({
    where: {
      studentMail: mail,
    },
    paranoid: false,
  });
};

const suspendStudent = (mail) => {
  return Student.destroy({
    where: {
      studentMail: mail,
    },
  });
};

const findOrCreateNotification = (msg, teacherId, regex) => {
  return Notification.findOrCreate({
    where: {
      notificationMsg: msg.replace(regex, ""),
      teacherId: teacherId,
    },
  });
};

const utils = {
  findOrCreateTeacher,
  findOrCreateStudent,
  findTeacher,
  findStudent,
  suspendStudent,
  findOrCreateNotification,
};
module.exports = utils;
