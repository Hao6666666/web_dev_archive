const error = {
  render(err) {
    const errorEL = document.querySelector(".error-messages");
    if (err) {
      errorEL.innerHTML = err;
    } else {
      errorEL.innerHTML = "";
    }
  },
};

module.exports = error;
