const express = require("express");
const app = express();
const db = require("./models");
const commonstudents = require("./routes/commonstudents");
const notification = require("./routes/notification");
const register = require("./routes/register");
const suspend = require("./routes/suspend");

(async () => {
  await db.sequelize.sync();
})();

const apiRoute = "/api/";
app.use(express.json());
app.use(`${apiRoute}register`, register);
app.use(`${apiRoute}commonstudents`, commonstudents);
app.use(`${apiRoute}suspend`, suspend);
app.use(`${apiRoute}retrievefornotifications`, notification);
app.listen(1234);
