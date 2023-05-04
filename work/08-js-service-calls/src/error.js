const error = {
  render(err) {
    const errorEL = document.querySelector(".login-status");
    if (err) {
      errorEL.innerHTML = err;
    } else {
      errorEL.innerHTML = "";
    }
  },
};

module.exports = error;
