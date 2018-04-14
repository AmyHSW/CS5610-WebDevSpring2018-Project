module.exports = function(app){

  var ProductModel = require("../models/product/product.model.server");
  app.post("/api/user/:userId/product", createProduct);
  app.get("/api/user/:userId/product",findAllProductsForUser);
  app.get("/api/product/:productId",findProductById);
  app.get("/api/product/",findAllProducts);
  app.put("/api/product/:productId",updateProduct);
  app.delete("/api/product/:productId",deleteProduct);
  app.get("/api/products/:productName",findProductsByProductName);

  function findAllProducts(req, res){
    ProductModel
      .findAllProducts()
      .then(function (products) {
        res.json(products);
      })
  }

  function createProduct(req, res) {
    var userId = req.params.userId;
    var product = req.body;
    product._user= userId;
    console.log(product);
    ProductModel
      .createProduct(product)
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
          res.sendStatus(500).send(err);
        });
  }
  function updateProduct(req,res) {
    var productId = req.params.productId;
    var product = req.body;

    ProductModel
      .updateProduct(productId, product)
      .then(function (stats) {
          // console.log(stats);
          res.send(200);
        },
        function (err) {
          res.sendStatus(500).send(err);
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
          res.sendStatus(500).send(err);
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
          res.sendStatus(500).send(err);
        });
  }

  function findProductsByProductName(req,res) {
    var productName = req.params.productName;
    //console.log(productName);
    ProductModel
      .findProductsByProductName(productName)
      .then(function (products) {
          res.json(products);
          //console.log(products);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }
}
