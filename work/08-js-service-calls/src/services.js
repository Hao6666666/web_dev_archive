const page = require("./page.js");
const userDB = require("./userDB");
const error = require("./error.js");

const service = {
  fetchLogin(username) {
    return fetch("/api/session/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .catch((err) => Promise.reject({ error: "network-error" }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            error.render(err.error);
            return Promise.reject(err);
          });
        }
        if (!userDB[username]) {
          userDB[username] = "";
        }
        return response.json();
      });
  },

  fetchLogout() {
    return fetch("/api/session/", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .catch((err) => Promise.reject({ error: "network-error" }))
      .then((response) => {
        return response.json();
      });
  },

  fetchSession() {
    return fetch("/api/session")
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
      .then(() => {
        return service.fetchGetWord();
      })
      .then((response) => {
        userDB[response.username] = response.storedWord;
        page.render(response.username);
      });
  },

  fetchGetWord() {
    return fetch("/api/word", {
      method: "GET",
    })
      .catch((err) => Promise.reject({ error: "network-error" }))
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      });
  },

  fetchPutWord(word) {
    return (
      fetch("/api/word", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ word }),
      })
        .catch((err) => Promise.reject({ error: "network-error" }))
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
          userDB[response.username] = response.storedWord;
        })
    );
  },
};

module.exports = service;
