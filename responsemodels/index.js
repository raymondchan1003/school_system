const messageTemplate = (msg) => {
  return {
    message: msg,
  };
};

const commonStudentsSuccessTemplate = (list) => {
  return {
    students: list,
  };
};

const retrieveForNotificationSuccessTemplate = (list) => {
  return {
    recipients: list,
  };
};

const responseModels = {
  messageTemplate,
  commonStudentsSuccessTemplate,
  retrieveForNotificationSuccessTemplate,
};
module.exports = responseModels;
