const userDB = require("./userDB");
const users = require("../users");

const page = {
  loginPage(username) {
    const loginEL = document.querySelector(".login-page");

    if (username in userDB) {
      loginEL.innerHTML = "";
    } else {
      loginEL.innerHTML = `
      <h1>Store A Word</h1>
      <form action="">
          <label>Username: 
              <input type="text" name="username" class="user-input">
          </label>
          <br>
          <button type="submit" class="login-btn">Login</button>    
      </form>
        `;
    }
  },

  gamePage(username) {
    const errorEL = document.querySelector(".login-status");
    errorEL.innerHTML = ":-)";

    const gemaEL = document.querySelector(".game-page");
    if (username in userDB) {
      const wordHTML = userDB[username]
        ? `<h1>Hi ${username} </h1> <p class="state-show">Your word is: ${userDB[username]}</p>`
        : `<h1>Hi ${username} </h1> <p class="state-empty">NO WORD. PLEASE SEND A WORD.</p>`;
      gemaEL.innerHTML = `
        ${wordHTML}
        <form action="">
            <label>
                Store word: <input type="text" class="word-input" name=${username}></input>
            </label>
            <button class='word-btn' type="submit" >Submit</button>
            <button class='logout-btn' type="submit">Logout</button>
        </form>
       `;
    } else {
      gemaEL.innerHTML = "";
    }
  },

  render(username) {
    page.loginPage(username);
    page.gamePage(username);
  },
};

module.exports = page;
