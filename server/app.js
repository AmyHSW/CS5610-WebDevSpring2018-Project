module.exports=function (app) {
  var db = require("./models/models.server.js");

  require("./services/user.service.server")(app);
  require("./services/product.service.server")(app);
  require("./services/review.service.server")(app);
};
