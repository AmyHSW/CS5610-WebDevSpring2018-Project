var mongoose = require ("mongoose");
var ProductSchema = require("./product.schema.server");

var ProductModel =  mongoose.model("product", ProductSchema);

ProductModel.findProductById = findProductById;
ProductModel.createProduct = createProduct;
ProductModel.findAllProductsForUser = findAllProductsForUser;
ProductModel.updateProduct = updateProduct;
ProductModel.deleteProduct = deleteProduct;


module.exports = ProductModel;


function findProductById(productId) {
  return ProductModel.findById({_id: productId});
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
