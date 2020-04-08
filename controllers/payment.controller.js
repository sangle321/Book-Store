var Cart = require('../models/cart');

module.exports.checkOut = function(req, res, next){
    if(! req.session.cart){
        return res.redirect('/cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('payment/payment', {
        totalPrice: cart.totalPrice,
        products: cart.generateArray()
    });
}