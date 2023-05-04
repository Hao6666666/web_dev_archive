const page = require("./page.js");
const controller = require("./controller.js");
const service = require("./service.js");

setTimeout(() => {
  controller.setUpController();
  controller.setRefresh();
  service.fetchSession();
  page.render();
}, 1000);
