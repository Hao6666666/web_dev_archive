const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const sessions = require("./sessions");
const data = require("./data");
const dataWeb = require("./dataWeb");
const loginWeb = require("./loginWeb");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && sessions.isValidSession(sid)) {
    const { username } = sessions.sessionData[sid];
    res.status(200).send(dataWeb.dataPage(username, data));
    return;
  } else {
    res.status(401).send(loginWeb.loginPage("Login Required"));
  }
});

app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
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

app.post("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete sessions.sessionData[sid];

  res.clearCookie("sid");
  res.redirect("/");
});

app.post("/data", express.urlencoded({ extended: false }), (req, res) => {
  const { username, text } = req.body;

  data.addWord({ sender: username, text: text });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
