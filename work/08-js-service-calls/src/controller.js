const page = require("./page.js");
const service = require("./services.js");

const controller = {
  setUpController() {
    const appEl = document.querySelector(".app");
    appEl.addEventListener("click", (e) => {
      e.preventDefault();
      const classname = e.target.className;
      if (classname === "login-btn") {
        const username = document.querySelector(".user-input").value;
        service
          .fetchLogin(username)
          .then(() => service.fetchSession())
          .then(() => service.fetchGetWord())
          .then(() => page.render(username));
      } else if (classname === "logout-btn") {
        service.fetchLogout().then(() => {
          page.render();
        });
      } else if (classname === "word-btn") {
        const word = document.querySelector(".word-input").value;
        const name = document.querySelector(".word-input").name;
        service.fetchPutWord(word).then(() => page.render(name));
      } else {
        return;
      }
    });
  },
};

module.exports = controller;
