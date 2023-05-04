/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/User.js":
/*!*********************!*\
  !*** ./src/User.js ***!
  \*********************/
/***/ ((module) => {

var User = {
  usercart: {},
  cartStatus: false
};
module.exports = User;

/***/ }),

/***/ "./src/cartItems.js":
/*!**************************!*\
  !*** ./src/cartItems.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cat = __webpack_require__(/*! ./cat.js */ "./src/cat.js");
var User = __webpack_require__(/*! ./User.js */ "./src/User.js");
var cartShow = __webpack_require__(/*! ./cartShow.js */ "./src/cartShow.js");
var cartItems = {
  cartList: function cartList() {
    var cartEl = document.querySelector(".cart__div");
    var cartStatus = User.cartStatus;
    var useritems = User.usercart;
    var totalPrice = 0;
    var cartELInner = Object.keys(useritems).map(function (key) {
      var catNums = useritems[key];
      totalPrice = totalPrice + cat[key].price * catNums;
      var itemstatus = catNums === 0 ? "noshow" : "show";
      return "\n        <div class=\"cart__items\">\n          <p class=\"cart__item__".concat(itemstatus, "\">").concat(cat[key].name, ": $").concat(cat[key].price, " * ").concat(catNums, "  \n            <span> ---- edit quantity:\n              <input id=\"update__cart").concat(key, "\"/>\n            </span>\n            <button class=\"update__cart__btn\" data-id=").concat(key, ">Update</button>\n          </p>\n        </div>\n      ");
    }).join("");
    cartEl.innerHTML = cartShow.show(cartELInner, totalPrice, cartStatus);
  }
};
module.exports = cartItems;

/***/ }),

/***/ "./src/cartShow.js":
/*!*************************!*\
  !*** ./src/cartShow.js ***!
  \*************************/
/***/ ((module) => {

var cartShow = {
  show: function show(cartELInner, totalPrice, cartStatus) {
    var opened = totalPrice !== 0 ? "\n        <div class=\"cart\">\n          ".concat(cartELInner, "\n        </div>\n        <div class=\"totalprice\">\n          <p>Total Price: ").concat(parseFloat(totalPrice).toFixed(2), "</p>\n          <button class=\"checkout__cart\">Checkout</button>\n          <button class=\"cart__status\">Hide Cart</button>\n        </div> ") : "\n        <div class=\"cart\">\n            <p>Empty Cart...</p>\n        </div>\n        <div class=\"totalprice\">\n          <button class=\"cart__status\">Hide Cart</button>\n        </div>\n        ";
    var closed = "<button class=\"cart__status\">View Cart</a>";
    return cartStatus ? opened : closed;
  }
};
module.exports = cartShow;

/***/ }),

/***/ "./src/cat.js":
/*!********************!*\
  !*** ./src/cat.js ***!
  \********************/
/***/ ((module) => {

var cat = {
  // Use id as the unique identifier for cat when adding to cart
  1: {
    id: 1,
    name: "Fluffball",
    image: "http://placekitten.com/150/150?image=1",
    price: 0.99
  },
  2: {
    id: 2,
    name: "Mayhem",
    image: "http://placekitten.com/150/150?image=2",
    price: 3.14
  },
  3: {
    id: 3,
    name: "Jorts",
    image: "http://placekitten.com/150/150?image=3",
    price: 2.73
  }
};
module.exports = cat;

/***/ }),

/***/ "./src/catItems.js":
/*!*************************!*\
  !*** ./src/catItems.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cat = __webpack_require__(/*! ./cat.js */ "./src/cat.js");
var catItems = {
  catList: function catList() {
    var catEL = document.querySelector(".cat__div");
    var catELInner = Object.keys(cat).map(function (key) {
      return "\n        <div class=\"cat\">\n          <li class=\"cat__list\">\n            <img class=\"cat__image\" src=".concat(cat[key].image, ">\n            <p class=\"cat__name\">Name: ").concat(cat[key].name, "</p>\n            <p class=\"cat__price\">Price: ").concat(cat[key].price, "/ea</p>\n            <button class=\"cat__btn\" data-id=").concat(cat[key].id, ">Add to Cart</button>\n          </li>\n        </div>\n        ");
    }).join("");
    catEL.innerHTML = catELInner;
  }
};
module.exports = catItems;

/***/ }),

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var catItems = __webpack_require__(/*! ./catItems.js */ "./src/catItems.js");
var cartItems = __webpack_require__(/*! ./cartItems.js */ "./src/cartItems.js");
var User = __webpack_require__(/*! ./User.js */ "./src/User.js");
var controller = {
  setcontrol: function setcontrol() {
    var catEL = document.querySelector(".cat__div");
    catEL.addEventListener("click", function (event) {
      event.preventDefault();
      if (event.target.tagName == "BUTTON") {
        var id = event.target.dataset.id;
        if (!User.usercart[id]) {
          User.usercart[id] = 0;
        }
        User.usercart[id] += 1;
        console.log(User.usercart[id]);
      }
      catItems.catList();
      cartItems.cartList();
    });
    var cartEL = document.querySelector(".cart__div");
    cartEL.addEventListener("click", function (event) {
      event.preventDefault();
      var classname = event.target.className;
      if (classname === "cart__status") {
        User.cartStatus = !User.cartStatus;
      } else if (classname === "update__cart__btn") {
        var id = event.target.dataset.id;
        var newNum = document.getElementById("update__cart".concat(id)).value;
        if (parseInt(newNum) < 0 || parseInt(newNum) !== parseFloat(newNum)) {
          return;
        }
        User.usercart[id] = parseInt(newNum);
      } else if (classname === "checkout__cart") {
        User.usercart = {};
      } else {
        return;
      }
      catItems.catList();
      cartItems.cartList();
    });
  }
};
module.exports = controller;

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
var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var catItems = __webpack_require__(/*! ./catItems */ "./src/catItems.js");
var cartItems = __webpack_require__(/*! ./cartItems */ "./src/cartItems.js");
catItems.catList();
cartItems.cartList();
controller.setcontrol();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map