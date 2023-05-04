const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;

const sessions = require("./session");
const users = require("./users");

router.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

router.post("/api/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.addSession(username);
  users.currentuUsers[username] = username;

  res.cookie("sid", sid);
  res.json({ username });
});

router.delete("/api/session", (req, res) => {
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

router.get("/api/post", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const storedPosts = users.posts || {};

  res.json({ storedPosts });
});

router.post("/api/post", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { text } = req.body;

  if (!text && text !== "") {
    res.status(400).json({ error: "required-word" });
    return;
  }
  const postid = uuid();
  const comments = [];
  const likes = 0;
  const wholiked = {};
  users.posts[postid] = { postid, username, text, comments, likes, wholiked };

  res.json({ postid, username, text, comments, likes, wholiked });
});

router.post("/api/post/:id/comment", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const postid = req.params.id;
  const text = req.body;

  if (!text && text !== "") {
    res.status(400).json({ error: "required-word" });
    return;
  }
  const content = text.comment;
  const comments = users.posts[postid].comments;
  comments.push({ username, content });

  res.json({ postid, username, content });
});

router.get("/api/post/:id/comment", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const postid = req.params.id;

  const storedComments = users.posts[postid].comments;

  res.json({ storedComments });
});

router.get("/api/user", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const currentUsers = users.currentuUsers || {};

  res.json({ currentUsers });
});

router.post("/api/post/:id/like", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const postid = req.params.id;
  const likes = req.body.likes;

  users.posts[postid].likes = likes;

  const wholiked = users.posts[postid].wholiked;
  wholiked[username] = username;

  res.json({ postid, likes, wholiked });
});

router.get("/api/post/:id/like", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const postid = req.params.id;

  const likes = users.posts[postid].likes;

  res.json({ likes });
});

module.exports = router;
