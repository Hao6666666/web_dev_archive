/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var page = __webpack_require__(/*! ./page.js */ "./src/page.js");
var service = __webpack_require__(/*! ./services.js */ "./src/services.js");
var controller = {
  setUpController: function setUpController() {
    var appEl = document.querySelector(".app");
    appEl.addEventListener("click", function (e) {
      e.preventDefault();
      var classname = e.target.className;
      if (classname === "login-btn") {
        var username = document.querySelector(".user-input").value;
        service.fetchLogin(username).then(function () {
          return service.fetchSession();
        }).then(function () {
          return service.fetchGetWord();
        }).then(function () {
          return page.render(username);
        });
      } else if (classname === "logout-btn") {
        service.fetchLogout().then(function () {
          page.render();
        });
      } else if (classname === "word-btn") {
        var word = document.querySelector(".word-input").value;
        var name = document.querySelector(".word-input").name;
        service.fetchPutWord(word).then(function () {
          return page.render(name);
        });
      } else {
        return;
      }
    });
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
    var errorEL = document.querySelector(".login-status");
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userDB = __webpack_require__(/*! ./userDB */ "./src/userDB.js");
var users = __webpack_require__(/*! ../users */ "./users.js");
var page = {
  loginPage: function loginPage(username) {
    var loginEL = document.querySelector(".login-page");
    if (username in userDB) {
      loginEL.innerHTML = "";
    } else {
      loginEL.innerHTML = "\n      <h1>Store A Word</h1>\n      <form action=\"\">\n          <label>Username: \n              <input type=\"text\" name=\"username\" class=\"user-input\">\n          </label>\n          <br>\n          <button type=\"submit\" class=\"login-btn\">Login</button>    \n      </form>\n        ";
    }
  },
  gamePage: function gamePage(username) {
    var errorEL = document.querySelector(".login-status");
    errorEL.innerHTML = ":-)";
    var gemaEL = document.querySelector(".game-page");
    if (username in userDB) {
      var wordHTML = userDB[username] ? "<h1>Hi ".concat(username, " </h1> <p class=\"state-show\">Your word is: ").concat(userDB[username], "</p>") : "<h1>Hi ".concat(username, " </h1> <p class=\"state-empty\">NO WORD. PLEASE SEND A WORD.</p>");
      gemaEL.innerHTML = "\n        ".concat(wordHTML, "\n        <form action=\"\">\n            <label>\n                Store word: <input type=\"text\" class=\"word-input\" name=").concat(username, "></input>\n            </label>\n            <button class='word-btn' type=\"submit\" >Submit</button>\n            <button class='logout-btn' type=\"submit\">Logout</button>\n        </form>\n       ");
    } else {
      gemaEL.innerHTML = "";
    }
  },
  render: function render(username) {
    page.loginPage(username);
    page.gamePage(username);
  }
};
module.exports = page;

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var page = __webpack_require__(/*! ./page.js */ "./src/page.js");
var userDB = __webpack_require__(/*! ./userDB */ "./src/userDB.js");
var error = __webpack_require__(/*! ./error.js */ "./src/error.js");
var service = {
  fetchLogin: function fetchLogin(username) {
    return fetch("/api/session/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })["catch"](function (err) {
      return Promise.reject({
        error: "network-error"
      });
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
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
  fetchLogout: function fetchLogout() {
    return fetch("/api/session/", {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })["catch"](function (err) {
      return Promise.reject({
        error: "network-error"
      });
    }).then(function (response) {
      return response.json();
    });
  },
  fetchSession: function fetchSession() {
    return fetch("/api/session")["catch"](function (err) {
      return Promise.reject(err);
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          error.render(err.error);
          return Promise.reject(err);
        });
      }
      return response.json();
    }).then(function () {
      return service.fetchGetWord();
    }).then(function (response) {
      userDB[response.username] = response.storedWord;
      page.render(response.username);
    });
  },
  fetchGetWord: function fetchGetWord() {
    return fetch("/api/word", {
      method: "GET"
    })["catch"](function (err) {
      return Promise.reject({
        error: "network-error"
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
  fetchPutWord: function fetchPutWord(word) {
    return fetch("/api/word", {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        word: word
      })
    })["catch"](function (err) {
      return Promise.reject({
        error: "network-error"
      });
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          error.render(err.error);
          return Promise.reject(err);
        });
      }
      return response.json();
    }).then(function (response) {
      userDB[response.username] = response.storedWord;
    });
  }
};
module.exports = service;

/***/ }),

/***/ "./src/userDB.js":
/*!***********************!*\
  !*** ./src/userDB.js ***!
  \***********************/
/***/ ((module) => {

var userDB = {};
module.exports = userDB;

/***/ }),

/***/ "./users.js":
/*!******************!*\
  !*** ./users.js ***!
  \******************/
/***/ ((module) => {

// Odd naming on "wordFor"?
// This is chosen to make the use of it read more naturally:
// `wordFor[username] = word;`
//
// Some teams will embrace that, others will want a more rigidly consistent style

var wordFor = {};

// We could have some functions to abstract the storage of words
// Similar to how sessions.js never exports the sessions object

// I've exported the wordFor object instead because our use is so simple
// - different people in the industry have different views on when is the
// best time to put a layer of abstraction around data

function isValidUsername(username) {
  var isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}
function isValidWord(word) {
  var isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}
module.exports = {
  isValidUsername: isValidUsername,
  isValidWord: isValidWord,
  wordFor: wordFor
};

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
var service = __webpack_require__(/*! ./services.js */ "./src/services.js");
controller.setUpController();
service.fetchSession();
page.render();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map