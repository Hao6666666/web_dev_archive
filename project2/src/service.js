const page = require("./page.js");
const error = require("./error.js");

const service = {
  fetchLogin(username) {
    return fetch("/v1/api/session/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .catch((err) => Promise.reject({ error: "Network error..." }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            error.render(err.error);
            return Promise.reject(err);
          });
        }
        return response.json();
      });
  },

  fetchLogout() {
    return fetch("/v1/api/session/", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .catch((err) => Promise.reject({ error: "Network error..." }))
      .then((response) => {
        return response.json();
      });
  },

  fetchGetChat() {
    return fetch("/v1/api/chat", {
      method: "GET",
    })
      .catch((err) => Promise.reject({ error: "Network error..." }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      });
  },

  fetchPostText(text) {
    return fetch("/v1/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .catch((err) => Promise.reject({ error: "Network error..." }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            error.render(err.error);
            return Promise.reject(err);
          });
        }
        return response.json();
      });
  },

  fetchGetUsers() {
    return fetch("/v1/api/user", {
      method: "GET",
    })
      .catch((err) => Promise.reject({ error: "Network error..." }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      });
  },

  fetchSession() {
    return fetch("/v1/api/session")
      .catch((err) => {
        return Promise.reject(err);
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            error.render(err.error);
            return Promise.reject(err);
          });
        }
        return response.json();
      })
      .then((response) => {
        page.render(response);
      })
      .then(() => {
        return service.fetchGetChat();
      })
      .then((response) => {
        page.chatPage(response);
      })
      .then(() => {
        return service.fetchGetUsers();
      })
      .then((response) => {
        page.userStatus(response.currentUsers);
      });
  },
};

module.exports = service;
