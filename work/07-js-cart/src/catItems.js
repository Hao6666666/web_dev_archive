const cat = require("./cat.js");

const catItems = {
  catList() {
    const catEL = document.querySelector(".cat__div");
    const catELInner = Object.keys(cat)
      .map((key) => {
        return `
        <div class="cat">
          <li class="cat__list">
            <img class="cat__image" src=${cat[key].image}>
            <p class="cat__name">Name: ${cat[key].name}</p>
            <p class="cat__price">Price: ${cat[key].price}/ea</p>
            <button class="cat__btn" data-id=${cat[key].id}>Add to Cart</button>
          </li>
        </div>
        `;
      })
      .join("");
    catEL.innerHTML = catELInner;
  },
};

module.exports = catItems;
