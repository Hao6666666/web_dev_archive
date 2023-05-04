const express = require("express");
const sessions = require("../utils/sessions.js");
const gameRoutes = express.Router();
const data = require("../utils/data.js");
const gameWeb = require("../utils/gameWeb.js");
const loginWeb = require("../utils/loginWeb.js");
const { guess, newGame } = require("../utils/game.js");

gameRoutes.get("/", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && sessions.isValidSession(sid)) {
    const { username } = sessions.sessionData[sid];
    res.status(200).send(gameWeb.dataPage(username, data));
    return;
  } else {
    res.status(401).send(loginWeb.loginPage("Login Required"));
  }
});

gameRoutes.post("/login", (req, res) => {
  const { username } = req.body;
  const error = sessions.validateUsername(username);

  if (error) {
    res.status(403).send(loginWeb.loginPage(error.message));
    return;
  }
  const sid = sessions.createSession(username);
  res.cookie("sid", sid);
  res.status(200).redirect("/");
});

gameRoutes.post("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete sessions.sessionData[sid];

  res.clearCookie("sid");
  res.redirect("/");
});

gameRoutes.post("/guess", guess);

gameRoutes.post("/newgame", newGame);

gameRoutes.post("/stat", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.status(401).redirect("/");
  }
  const { username } = sessions.sessionData[sid];
  res.send(statisticsWeb.statisticsPage(username, data));
});

module.exports = gameRoutes;
