const gameWeb = {
  dataPage: function (username, data) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Game</title>
            <link rel="stylesheet" href="/css/data.css" />
          </head>
          <body>
            <div class="data__page">
              <h1>Hi ${username}, welcome!</h1>
              <p class="word__table">${data.userData[
                username
              ].userWordTable.join(" ")}</p>
              <div class="status__bar">
                <p>Valid Round: ${data.userData[username].guessedCount}</p>
                <p>Guess Status: <a class="status">${
                  data.userData[username].lastGuessStatus
                }</a></p>
              </div>
              <div class="data-app">
                ${gameWeb.getWordList(username, data)}
                ${gameWeb.win(username, data)}
                ${
                  data.userData[username].won === false
                    ? gameWeb.getOutgoing(username)
                    : `<p></p>`
                }
                <form action="/logout", method="POST">
                <button type="submit" class="logoutbtn">Logout</button>
                </form>  
                <form action="/newgame", method="POST">
                  <button type="submit" class="newgamebtn">NewGame</button>
                </form>
              </div>
              
          </body>
        </html>
    `;
  },

  getWordList: function (username, data) {
    return (
      `<ul class="words">` +
      data.userData[username].guessedWord
        .map(
          (word) => `
      <li>
        <span class="word">Your guess: <a class="guess__word">${
          word[0]
        }</a> is <a class="status"> ${word[2]}</a>.
        ${
          word[2] === "invalid"
            ? ``
            : `It has ${word[1]} common letters with result</span>`
        } 
        
      </li>
    `
        )
        .join("") +
      `</ul>`
    );
  },

  win: function (username, data) {
    return `
      <div class="win">
        ${
          data.userData[username].lastGuessStatus === "correct"
            ? `<p class="win__game">CONGRATS!!YOU WIN THE GAME!!</p><p class="win__game">CORRECT ANSWER: ${data.userData[username].word}</p>`
            : `<p></p>`
        }
      </div>
    `;
  },

  getOutgoing: function (username) {
    return `
          <form action="/guess" method="POST">
            <input class="to-send" name="text" value="" placeholder="Enter word to store" />
            <input type="hidden" name="username" value=${username}>
            <button type="submit">Send to guess</button>
          </form>`;
  },
};

module.exports = gameWeb;
