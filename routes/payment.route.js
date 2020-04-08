const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const Cart = require('../models/cart');
var Order = require('../models/order');

const paypal = require('paypal-rest-sdk');

var controller = require('../controllers/payment.controller');

router.get('/check-out', controller.checkOut)

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASSIgqUynuO-2Wd19vK2ZtBaS4xZINiuHGPqTg-aeoVXFnxjPmus2zjgqvRWZT3u9rON0k_xPP8c2TtC',
    'client_secret': 'EBNSj-sVf_VpZlJ4NKv5vCkgGj-hRvcKq-dsCkmATJm9gpeoVceNzQINVb-md2lAdZeFhHIIRVevhvJV'
});

router.post('/pay', (req, res) => {
    if(! req.session.cart){
        return res.redirect('/cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);

    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "(Sách, Truyện tranh)",
                  "sku": 'xx',
                  "price": cart.totalPrice,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": cart.totalPrice
          },
          "description": "Hat for the best team ever"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var cart = new Cart(req.session.cart);
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": cart.totalPrice
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
        //   console.log(JSON.stringify(payment));
        var order = new Order({
            user: req.user,
            cart : cart,
            paymentId: payment.id
        });

        order.save();
        req.flash('success', 'Thanh Toán Thành Công')
        req.session.cart = null;
        res.redirect('/product');
        //   return res.render('payment/success')
      }
  });
});
  
router.get('/cancel', (req, res) => res.send('Cancelled'));




module.exports = router