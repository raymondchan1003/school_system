const express = require("express");
const router = express.Router();
const {
  findOrCreateTeacher,
  findOrCreateStudent,
  findOrCreateNotification,
} = require("../../utilities");
const {
  messageTemplate,
  retrieveForNotificationSuccessTemplate,
} = require("../../responsemodels");
const { OK, BadRequest, InternalServerError } = require("../../statuscodes");

router.post("/", async (req, res) => {
  const regex = /@\S+/g;
  const { teacher, notification } = req.body;
  const studentRequestParam = notification.match(regex);
  if (teacher && notification) {
    try {
      const [teacherInstance] = await findOrCreateTeacher(teacher);
      const [notificationInstance] = await findOrCreateNotification(
        notification,
        teacherInstance.id,
        regex
      );
      const setTeacherStatus = await notificationInstance.setTeacher(
        teacherInstance
      );
      if (teacherInstance && notificationInstance && setTeacherStatus) {
        const studentInstances = await teacherInstance.getStudents();
        const registeredStudentMailList =
          studentInstances &&
          studentInstances.map((student) => student.studentMail);

        const newStudentsMailList = [];
        studentRequestParam.forEach((item) => {
          const mail = item.slice(1);
          if (![registeredStudentMailList].includes(mail)) {
            newStudentsMailList.push(mail);
          }
        });

        const promises = await Promise.all(
          newStudentsMailList &&
            newStudentsMailList.map(
              async (student) => await findOrCreateStudent(student)
            )
        );

        let newStudentsInstances =
          promises &&
          promises.map((item) => {
            const [student] = item;
            return student;
          });
        newStudentsInstances = newStudentsInstances.filter(
          (item) => item.deletedAt == null
        );

        const totalStudentsInstances =
          studentInstances.concat(newStudentsInstances);
        const addStudentsStatus = await notificationInstance.addStudents(
          totalStudentsInstances
        );
        const recipients =
          totalStudentsInstances &&
          totalStudentsInstances.map((student) => student.studentMail);
        res.status(OK).json(retrieveForNotificationSuccessTemplate(recipients));
      } else {
        res.status(OK).json(messageTemplate("Notification fail to send out!"));
      }
    } catch (err) {
      res.status(InternalServerError).json(messageTemplate(err.message));
    }
  } else {
    res
      .status(BadRequest)
      .json(messageTemplate("Invalid request body provided!"));
  }
});

module.exports = router;
