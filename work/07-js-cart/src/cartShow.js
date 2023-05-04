const cartShow = {
  show(cartELInner, totalPrice, cartStatus) {
    const opened =
      totalPrice !== 0
        ? `
        <div class="cart">
          ${cartELInner}
        </div>
        <div class="totalprice">
          <p>Total Price: ${parseFloat(totalPrice).toFixed(2)}</p>
          <button class="checkout__cart">Checkout</button>
          <button class="cart__status">Hide Cart</button>
        </div> `
        : `
        <div class="cart">
            <p>Empty Cart...</p>
        </div>
        <div class="totalprice">
          <button class="cart__status">Hide Cart</button>
        </div>
        `;

    const closed = `<button class="cart__status">View Cart</a>`;

    return cartStatus ? opened : closed;
  },
};

module.exports = cartShow;
