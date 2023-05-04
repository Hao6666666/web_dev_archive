const wordList = require("./words.js");
const data = require("./data.js");
const sessions = require("./sessions.js");
const compare = require("./compare.js");

const gameServer = {
  newGame(req, res) {
    const sid = req.cookies["sid"];
    const { username } = sessions.sessionData[sid];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    if (!username || !sessions.isValidSession(sid)) {
      res.status(401).redirect("/");
    }

    data.userData[username] = {
      username: username,
      word,
      lastGuessStatus: undefined,
      guessedWord: [],
      guessedCount: 0,
      won: false,
      userWordTable: structuredClone(wordList),
    };

    console.log(`User ${username} started a new game`);
    console.log(`User ${username}'s secret word is ${word}`);

    res.redirect("/");
  },

  guess(req, res) {
    const sid = req.cookies["sid"];
    const { username, text } = req.body;

    if (!username || !sessions.isValidSession(sid)) {
      res.status(401).redirect("/");
      return;
    }

    const userData = data.userData[username];
    const word = data.userData[username].word;
    const guess = text;

    if (gameServer.correctGuess(username, guess, word)) {
      userData.lastGuessStatus = "correct";
      userData.won = true;
    } else if (gameServer.validGuess(username, guess, word, userData)) {
      userData.lastGuessStatus = "valid";
    } else if (gameServer.incorrectGuess(username, guess, word, userData)) {
      userData.lastGuessStatus = "incorrect";
    } else if (gameServer.invalidGuess(username, guess, userData)) {
      userData.lastGuessStatus = "invalid";
    }
    gameServer.removeGuessedWord(username, guess);
    if (
      userData.lastGuessStatus === "valid" ||
      userData.lastGuessStatus === "correct"
    ) {
      userData.guessedCount += 1;
    }
    userData.guessedWord.push([
      guess,
      compare.compare(guess, word),
      userData.lastGuessStatus,
    ]);

    res.redirect("/");
  },

  removeGuessedWord(username, guess) {
    const arr = data.userData[username].userWordTable;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === guess) {
        arr.splice(i, 1);
      }
    }
  },

  correctGuess(username, guess, word) {
    return (
      data.userData[username].userWordTable.includes(guess.toLowerCase()) &&
      guess.toLowerCase() == word
    );
  },

  incorrectGuess(username, guess, word, userData) {
    return (
      data.userData[username].userWordTable.includes(guess.toLowerCase()) &&
      userData.guessedWord.includes(guess) &&
      word.toLowerCase() != word
    );
  },

  validGuess(username, guess, word, userData) {
    return (
      data.userData[username].userWordTable.includes(guess.toLowerCase()) &&
      !userData.guessedWord.includes(guess) &&
      guess.toLowerCase() != word
    );
  },

  invalidGuess(username, guess, userData) {
    return (
      userData.guessedWord.includes(guess.toLowerCase()) ||
      !data.userData[username].userWordTable.includes(guess.toLowerCase())
    );
  },
};

module.exports = gameServer;
