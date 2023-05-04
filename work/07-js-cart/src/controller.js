const catItems = require("./catItems.js");
const cartItems = require("./cartItems.js");
const User = require("./User.js");

const controller = {
  setcontrol() {
    const catEL = document.querySelector(".cat__div");
    catEL.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.tagName == "BUTTON") {
        const id = event.target.dataset.id;
        if (!User.usercart[id]) {
          User.usercart[id] = 0;
        }
        User.usercart[id] += 1;
        console.log(User.usercart[id]);
      }

      catItems.catList();
      cartItems.cartList();
    });

    const cartEL = document.querySelector(".cart__div");
    cartEL.addEventListener("click", (event) => {
      event.preventDefault();
      const classname = event.target.className;

      if (classname === "cart__status") {
        User.cartStatus = !User.cartStatus;
      } else if (classname === "update__cart__btn") {
        const id = event.target.dataset.id;

        const newNum = document.getElementById(`update__cart${id}`).value;

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
  },
};

module.exports = controller;
