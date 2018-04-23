var mongoose = require ("mongoose");
var ProductSchema = require("./product.schema.server");
var ProductModel =  mongoose.model("ProductModel", ProductSchema);


ProductModel.findProductById = findProductById;
ProductModel.createProduct = createProduct;
ProductModel.findAllProductsForUser = findAllProductsForUser;
ProductModel.updateProduct = updateProduct;
ProductModel.deleteProduct = deleteProduct;
ProductModel.findAllProducts = findAllProducts;
ProductModel.findProductsByProductName = findProductsByProductName;


module.exports = ProductModel;

function findAllProducts(){
  return ProductModel.find()
    .populate({path: 'reviews', model: 'ReviewModel', populate: { path: '_user'}})
    .exec();
}

function findProductById(productId) {
  return ProductModel.findById(productId);
}

function findAllProductsForUser(userId) {
  return ProductModel.find({_user: userId});
}

function updateProduct(productId, product){
  return ProductModel.update({_id: productId}, product);
}

function deleteProduct(productId) {
  return ProductModel.remove({_id: productId});
}

function createProduct(product){
  console.log(product);
  return  ProductModel.create(product);
}

function findProductsByProductName(productName) {
  //console.log("model" + " productName")
  return ProductModel.find({productName: {'$regex': '.*' + productName + '.*'}})
    .populate({path: 'reviews', model: 'ReviewModel', populate: { path: '_user'}})
    .exec();
}
