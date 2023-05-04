const sessionData = {};
const { v4: uuidv4 } = require("uuid");
const data = require("./data");

const isValidSession = function (sid) {
  return sessionData[sid];
};

const validateUsername = function (username) {
  const clean = username.replace(/[^A-Za-z0-9_]+/g, "");
  if (username.toLowerCase() === "dog" || clean !== username) {
    return { message: "Invalid Username" };
  }
  if (!username) {
    return { message: "Empty Username" };
  }
  return "";
};

const createSession = function (username) {
  const sid = uuidv4();
  sessionData[sid] = {
    username: username,
  };

  if (!data.userData[username]) {
    data.userData[username] = {
      username: username,
      words: "",
    };
  }
  return sid;
};

const sessions = {
  sessionData,
  isValidSession,
  validateUsername,
  createSession,
};

module.exports = sessions;
