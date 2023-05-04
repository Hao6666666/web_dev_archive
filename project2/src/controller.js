const page = require("./page.js");
const service = require("./service.js");

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
          .then((response) => page.render(response))
          .then(() => {
            return service.fetchGetChat();
          })
          .then((response) => page.chatPage(response))
          .then(() => {
            return service.fetchGetUsers();
          })
          .then((response) => page.userStatus(response.currentUsers));
      } else if (classname === "logout-btn") {
        service.fetchLogout().then(() => {
          page.chatPage();
          page.userStatus();
          page.render();
        });
      } else if (classname === "text-btn") {
        const text = document.querySelector(".text-input").value;
        document.querySelector(".text-form").reset();
        service
          .fetchPostText(text)
          .then(() => {
            return service.fetchGetChat();
          })
          .then((response) => page.chatPage(response));
      } else {
        return;
      }
    });
  },

  setRefresh() {
    setInterval(() => {
      return service
        .fetchGetChat()
        .then((response) => {
          page.chatPage(response);
        })
        .then(() => {
          return service.fetchGetUsers();
        })
        .then((response) => {
          page.userStatus(response.currentUsers);
        });
    }, 5000);
  },
};

module.exports = controller;
