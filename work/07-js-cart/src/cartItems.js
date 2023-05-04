const cat = require("./cat.js");
const User = require("./User.js");
const cartShow = require("./cartShow.js");

const cartItems = {
  cartList() {
    const cartEl = document.querySelector(".cart__div");
    const cartStatus = User.cartStatus;
    const useritems = User.usercart;
    let totalPrice = 0;

    const cartELInner = Object.keys(useritems)
      .map((key) => {
        const catNums = useritems[key];
        totalPrice = totalPrice + cat[key].price * catNums;
        const itemstatus = catNums === 0 ? "noshow" : "show";
        return `
        <div class="cart__items">
          <p class="cart__item__${itemstatus}">${cat[key].name}: $${cat[key].price} * ${catNums}  
            <span> ---- edit quantity:
              <input id="update__cart${key}"/>
            </span>
            <button class="update__cart__btn" data-id=${key}>Update</button>
          </p>
        </div>
      `;
      })
      .join("");

    cartEl.innerHTML = cartShow.show(cartELInner, totalPrice, cartStatus);
  },
};

module.exports = cartItems;
