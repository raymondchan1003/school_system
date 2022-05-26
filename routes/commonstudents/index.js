const express = require("express");
const router = express.Router();
const { findTeacher } = require("../../utilities");
const {
  messageTemplate,
  commonStudentsSuccessTemplate,
} = require("../../responsemodels");
const { OK, BadRequest, InternalServerError } = require("../../statuscodes");

router.get("/", async (req, res) => {
  const { teacher } = req.query;
  if (teacher) {
    try {
      const teacherList = Array.isArray(teacher) ? teacher : [teacher];
      const teacherInstances = await Promise.all(
        teacherList &&
          teacherList.map(async (teacher) => await findTeacher(teacher))
      );
      const invalid =
        teacherInstances && teacherInstances.filter((item) => item == null);
      if (!invalid.length) {
        const studentInstances = await Promise.all(
          teacherInstances &&
            teacherInstances.map(
              async (teacherInstance) =>
                await teacherInstance.getStudents({
                  paranoid: false,
                })
            )
        );
        let commonStudentList = studentInstances.reduce((join, current) =>
          join.filter((el) =>
            current.find((cl) => cl.studentMail === el.studentMail)
          )
        );
        commonStudentList =
          commonStudentList &&
          commonStudentList.map((item) => item.studentMail);
        res.status(OK).json(commonStudentsSuccessTemplate(commonStudentList));
      } else {
        res
          .status(BadRequest)
          .json(messageTemplate("Invalid teacher email provided!"));
      }
    } catch (err) {
      res.status(InternalServerError).json(messageTemplate(err.message));
    }
  } else {
    res
      .status(BadRequest)
      .json(messageTemplate("Invalid request query provided!"));
  }
});

module.exports = router;
