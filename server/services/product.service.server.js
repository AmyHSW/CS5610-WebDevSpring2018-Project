module.exports = function(app){

  var ProductModel = require("../models/product/product.model.server");
  app.post("/api/product", createProduct);
  app.get("/api/product/:userId/product",findAllProductsForUser);
  app.get("/api/product/:productId",findProductById);
  app.put("/api/product/:productId",updateProduct);
  app.delete("/api/product/:productId",deleteProduct);

  /* pattern matching usies only base URL. it ignores anything after ?
   app.get("/api/user/:userId", findUserById);
   app.get("/api/user/:userId", findUserById);
   are the same URLs to Express!     */

  function createProduct(req, res) {
    var userId = req.params.userId;
    var product = req.body;
    product._user= userId;
    console.log(product);
    ProductModel
      .createProduct(userId, product)
      .then(function (product) {
        res.json(product);});
  }

  function findAllProductsForUser(req,res) {
    var userId = req.params.userId;

    ProductModel
      .findAllProductsForUser(userId)
      .then(function (products) {
          res.json(products);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }
  function updateProduct(req,res) {
    var productId = req.params.productId;
    var product = req.body;

    ProductModel
      .updateProduct(productId, product)
      .then(function (stats) {
          console.log(stats);
          res.send(200);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }
  function findProductById(req,res ) {
    var productId = req.params.productId;
    ProductModel
      .findProductById(productId)
      .then(function (product) {
          res.json(product);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function deleteProduct(req,res) {
    var productId = req.params.productId;
    ProductModel
      .deleteProduct(productId)
      .then (function (stats) {
          console.log(stats);
          res.send(200);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }
}
