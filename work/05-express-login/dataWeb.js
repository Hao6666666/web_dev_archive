const dataWeb = {
  dataPage: function (username, data) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Data</title>
            <link rel="stylesheet" href="/css/data.css" />
          </head>
          <body>
            <div class="data__page">
              <h1>Hi ${username}, welcome!</h1>
              <div class="data-app">
                ${dataWeb.getWordList(username, data)}
                ${dataWeb.getOutgoing(username)}
              </div>
              <form action="/logout", method="POST">
                <button type="submit" class="logoutbtn">Logout</button>
              </form>  
            </div>  
          </body>
        </html>
    `;
  },

  getWordList: function (username, data) {
    return `
    <div class="stored__word">
      <p class="stored__word__description">Your stored word:</p>
      <h3 class="word"> ${data.userData[username].words}</h3>
    </div>
    `;
  },

  getOutgoing: function (username) {
    return `
        <div class="outgoing">
          <form action="/data" method="POST">
            <input class="to-send" name="text" value="" placeholder="Enter word to store" />
            <input type="hidden" name="username" value=${username}>
            <button type="submit">Send</button>
          </form>
        </div>`;
  },
};

module.exports = dataWeb;
