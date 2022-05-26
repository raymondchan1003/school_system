const express = require("express");
const router = express.Router();
const { findOrCreateTeacher, findOrCreateStudent } = require("../../utilities");
const { messageTemplate } = require("../../responsemodels");
const { BadRequest, InternalServerError, OK } = require("../../statuscodes");

router.post("/", async (req, res) => {
  const { teacher, students } = req.body;
  if (teacher && students) {
    try {
      const [teacherInstance] = await findOrCreateTeacher(teacher);
      const promises = await Promise.all(
        students &&
          students.map(async (student) => await findOrCreateStudent(student))
      );
      const studentInstances =
        promises &&
        promises.map((item) => {
          const [student] = item;
          return student;
        });

      const status = await teacherInstance.addStudents(studentInstances);
      if (status != undefined) {
        res.send();
      } else {
        res
          .status(OK)
          .json(
            messageTemplate(
              "All the students email provided had been registered previously!"
            )
          );
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
