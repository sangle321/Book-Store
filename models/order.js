const mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    paymentId: {type: String, required: true}
});

let Order = mongoose.model('Order', orderSchema, 'order');

module.exports = Order;