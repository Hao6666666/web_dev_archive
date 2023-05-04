const page = require("./page.js");
const controller = require("./controller.js");
const service = require("./services.js");

controller.setUpController();
service.fetchSession();
page.render();
