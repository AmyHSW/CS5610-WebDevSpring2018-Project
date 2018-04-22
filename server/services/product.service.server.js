module.exports = function(app){
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../dist/assets/uploads' });
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var ProductModel = require("../models/product/product.model.server");
  app.post("/api/user/:userId/product", createProduct);
  app.get("/api/user/:userId/product",findAllProductsForUser);
  app.get("/api/product/:productId",findProductById);
  app.get("/api/product/",findAllProducts);
  app.put("/api/product/:productId",updateProduct);
  app.delete("/api/product/:productId",deleteProduct);
  app.get("/api/products/:productName",findProductsByProductName);


  function uploadImage(req, res) {
    var userId = req.body.userId;
    var productName = req.body.productName;
    var brand = req.body.brand;
    var price = req.body.price;

    var description     = req.body.description;
    var myFile        = req.file;
    var filename      = myFile.filename;     // new file name in upload folder
    var product = {'productName': productName, price: price, 'brand': brand, 'description': description, 'width':"100%", 'url':"assets/uploads/" + filename};
    product._user= userId;
    ProductModel.createProduct(product);
    const jumpurl = '/user/product';
    res.redirect(jumpurl);
  }



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
    console.log(product);
    ProductModel
      .updateProduct(productId, product)
      .then(function (stats) {
          // console.log(stats);
          res.status(200).send({});
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
