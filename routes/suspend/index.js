const express = require("express");
const router = express.Router();
const { findStudent, suspendStudent } = require("../../utilities");
const { messageTemplate } = require("../../responsemodels");
const { BadRequest, InternalServerError, OK } = require("../../statuscodes");

router.post("/", async (req, res) => {
  const { student } = req.body;
  if (student) {
    try {
      const studentInstance = await findStudent(student);
      if (studentInstance == null) {
        res.status(BadRequest).json(messageTemplate("Invalid student email!"));
      } else {
        const status = await suspendStudent(student);
        if (status > 0) {
          res.send();
        } else {
          res
            .status(OK)
            .json(messageTemplate(`${student} had been suspended previously!`));
        }
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
