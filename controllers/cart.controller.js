const Session = require('../models/session.model');
const Product = require('../models/product.model')

const Cart = require('../models/cart')


module.exports.addToCart = (req, res, next)=>{
    var productId = req.params.productId;

    var cart = new
     Cart(req.session.cart ? req.session.cart : {items: {}});

    Product.findById(productId,  function(err, product){
        if(err){
            return res.redirect('/product');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/product')

    });
};

module.exports.showCart = function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shopping-cart/shopping', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart/shopping', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
};

module.exports.removeBook = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
};