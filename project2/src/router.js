const express = require("express");
const router = express.Router();

const sessions = require("./session");
const users = require("./users");

router.get("/v1/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "Authentication failed..." });
    return;
  }
  res.json({ username });
});

router.post("/v1/api/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({ error: "Bad Username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "No dog access..." });
    return;
  }

  const sid = sessions.addSession(username);
  users.currentuUsers[username] = username;

  res.cookie("sid", sid);
  res.json({ username });
});

router.delete("/v1/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  delete users.currentuUsers[username];

  res.json({ wasLoggedIn: !!username }); 
});

router.get("/v1/api/chat", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const storedChat = users.messages || "";

  res.json({ storedChat });
});

router.post("/v1/api/chat", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "Authentication failed..." });
    return;
  }

  const { text } = req.body;

  if (!text && text !== "") {
    res.status(400).json({ error: "Invalid message..." });
    return;
  }

  users.messages.push({ username, text });

  res.json({ username, text });
});

router.get("/v1/api/user", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "Authentication failed..." });
    return;
  }

  const currentUsers = users.currentuUsers || {};

  res.json({ currentUsers });
});

module.exports = router;
