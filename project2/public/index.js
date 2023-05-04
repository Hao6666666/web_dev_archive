/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var page = __webpack_require__(/*! ./page.js */ "./src/page.js");
var service = __webpack_require__(/*! ./service.js */ "./src/service.js");
var controller = {
  setUpController: function setUpController() {
    var appEl = document.querySelector(".app");
    appEl.addEventListener("click", function (e) {
      e.preventDefault();
      var classname = e.target.className;
      if (classname === "login-btn") {
        var username = document.querySelector(".user-input").value;
        service.fetchLogin(username).then(function (response) {
          return page.render(response);
        }).then(function () {
          return service.fetchGetChat();
        }).then(function (response) {
          return page.chatPage(response);
        }).then(function () {
          return service.fetchGetUsers();
        }).then(function (response) {
          return page.userStatus(response.currentUsers);
        });
      } else if (classname === "logout-btn") {
        service.fetchLogout().then(function () {
          page.chatPage();
          page.userStatus();
          page.render();
        });
      } else if (classname === "text-btn") {
        var text = document.querySelector(".text-input").value;
        document.querySelector(".text-form").reset();
        service.fetchPostText(text).then(function () {
          return service.fetchGetChat();
        }).then(function (response) {
          return page.chatPage(response);
        });
      } else {
        return;
      }
    });
  },
  setRefresh: function setRefresh() {
    setInterval(function () {
      return service.fetchGetChat().then(function (response) {
        page.chatPage(response);
      }).then(function () {
        return service.fetchGetUsers();
      }).then(function (response) {
        page.userStatus(response.currentUsers);
      });
    }, 5000);
  }
};
module.exports = controller;

/***/ }),

/***/ "./src/error.js":
/*!**********************!*\
  !*** ./src/error.js ***!
  \**********************/
/***/ ((module) => {

var error = {
  render: function render(err) {
    var errorEL = document.querySelector(".error-messages");
    if (err) {
      errorEL.innerHTML = err;
    } else {
      errorEL.innerHTML = "";
    }
  }
};
module.exports = error;

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((module) => {

var page = {
  loginPage: function loginPage(response) {
    var LoaderEL = document.querySelector(".loader");
    LoaderEL.innerHTML = "";
    var loginEL = document.querySelector(".login-page");
    if (response !== undefined) {
      loginEL.innerHTML = "";
    } else {
      loginEL.innerHTML = "\n      <h1>Chat Room</h1>\n      <form action=\"\">\n          <label>Username: \n              <input type=\"text\" name=\"username\" class=\"user-input\">\n          </label>\n          <button type=\"submit\" class=\"login-btn\">Login</button>    \n      </form>\n        ";
    }
  },
  userStatus: function userStatus(response) {
    var currentUserEL = document.querySelector(".login-status");
    if (response) {
      currentUserEL.innerHTML = page.getCurrentUsers(response);
      var chatList = document.querySelector(".messages");
      chatList.scrollTop = chatList.scrollHeight;
    } else {
      currentUserEL.innerHTML = "";
    }
  },
  chatPage: function chatPage(response) {
    var errorEL = document.querySelector(".error-messages");
    errorEL.innerHTML = ":-)";
    var chatPage = document.querySelector(".chat-page");
    if (response !== undefined) {
      chatPage.innerHTML = page.getMessageList(response.storedChat);
    } else {
      chatPage.innerHTML = "";
    }
  },
  chatButton: function chatButton(response) {
    var LoaderEL = document.querySelector(".loader");
    LoaderEL.innerHTML = "";
    var chatButton = document.querySelector(".chat-button");
    if (response !== undefined) {
      chatButton.innerHTML = "\n        <h3>Send Message</h3>\n        <form action=\"\" class=\"text-form\">\n            <label>\n                <input type=\"text\" class=\"text-input\" name=".concat(response.username, " placeholder=\"Hi ").concat(response.username, ", Enter your message\"></input>\n            </label>\n            <button class='text-btn' type=\"submit\" >Submit</button>\n            <button class='logout-btn' type=\"submit\">Logout</button>\n        </form>\n       ");
    } else {
      chatButton.innerHTML = "";
    }
  },
  getMessageList: function getMessageList(content) {
    return "<h3>Chat History</h3><ol class=\"messages\">" + content.map(function (chat) {
      return "\n              <li>\n                <div class=\"message\">\n                  <div class=\"sender-info\">\n                    <span class=\"username\">".concat(chat.username, "</span>\n                  </div>\n                  <p class=\"message-text\">").concat(chat.text, "</p>\n                </div>\n              </li>\n        ");
    }).join("") + "</ol>";
  },
  getCurrentUsers: function getCurrentUsers(content) {
    return "<a>Online Users:</a><ul class=\"current-user\">" + Object.keys(content).map(function (user) {
      return "\n              <li>".concat(user, "</li>\n        ");
    }).join("") + "</ul>";
  },
  render: function render(response) {
    page.loginPage(response);
    page.chatButton(response);
  }
};
module.exports = page;

/***/ }),

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var page = __webpack_require__(/*! ./page.js */ "./src/page.js");
var error = __webpack_require__(/*! ./error.js */ "./src/error.js");
var service = {
  fetchLogin: function fetchLogin(username) {
    return fetch("/v1/api/session/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })["catch"](function (err) {
      return Promise.reject({
        error: "Network error..."
      });
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          error.render(err.error);
          return Promise.reject(err);
        });
      }
      return response.json();
    });
  },
  fetchLogout: function fetchLogout() {
    return fetch("/v1/api/session/", {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })["catch"](function (err) {
      return Promise.reject({
        error: "Network error..."
      });
    }).then(function (response) {
      return response.json();
    });
  },
  fetchGetChat: function fetchGetChat() {
    return fetch("/v1/api/chat", {
      method: "GET"
    })["catch"](function (err) {
      return Promise.reject({
        error: "Network error..."
      });
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          return Promise.reject(err);
        });
      }
      return response.json();
    });
  },
  fetchPostText: function fetchPostText(text) {
    return fetch("/v1/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        text: text
      })
    })["catch"](function (err) {
      return Promise.reject({
        error: "Network error..."
      });
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          error.render(err.error);
          return Promise.reject(err);
        });
      }
      return response.json();
    });
  },
  fetchGetUsers: function fetchGetUsers() {
    return fetch("/v1/api/user", {
      method: "GET"
    })["catch"](function (err) {
      return Promise.reject({
        error: "Network error..."
      });
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          return Promise.reject(err);
        });
      }
      return response.json();
    });
  },
  fetchSession: function fetchSession() {
    return fetch("/v1/api/session")["catch"](function (err) {
      return Promise.reject(err);
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          error.render(err.error);
          return Promise.reject(err);
        });
      }
      return response.json();
    }).then(function (response) {
      page.render(response);
    }).then(function () {
      return service.fetchGetChat();
    }).then(function (response) {
      page.chatPage(response);
    }).then(function () {
      return service.fetchGetUsers();
    }).then(function (response) {
      page.userStatus(response.currentUsers);
    });
  }
};
module.exports = service;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var page = __webpack_require__(/*! ./page.js */ "./src/page.js");
var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var service = __webpack_require__(/*! ./service.js */ "./src/service.js");
setTimeout(function () {
  controller.setUpController();
  controller.setRefresh();
  service.fetchSession();
  page.render();
}, 1000);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map