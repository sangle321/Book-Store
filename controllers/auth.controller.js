const User = require('../models/user.model');
const md5 = require('md5');

var Order = require('../models/order');
var Cart = require('../models/cart');

module.exports.login = (req, res)=> {
    res.render('auth/login');
}

module.exports.postLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({email: email});

    if(!user){
      res.render('auth/login', {
        errors: ['Email không tồn tại !'],
        values: req.body
      });
      return;
    }
    var hashpassword = md5(password);
    var password_ = await User.findOne({password: hashpassword});

    if(!password_){
      res.render('auth/login', {
        errors: ['Mật khẩu của bạn không đúng !'],
      });
      return;
    }
    res.cookie('userID', user.id, {signed: true});
    res.cookie('name' , user.lastName, {signed: true});
    res.redirect('/product');
    alert('Đăng nhập thành công');
}

// Sign up
module.exports.sign_up = (req, res) => {
    res.render('auth/sign-up');
}

module.exports.postSignUp = (req, res) => {
    let errors = [];
    if(!req.body.firstName || !req.body.lastName){
      errors.push('Thông tin họ tên cần nhập đây đủ !');
    }

    if(!req.body.email){
      errors.push('Thông tin email cần đươc nhập !');
    }

    if(!req.body.phone){
      errors.push('Thông tin phone cần đươc nhập !');
    }

    if(!req.body.password){
      errors.push('Bắt buộc phải nhập mật khẩu !');
    }

    if(errors.length){
      res.render('auth/sign-up', {
        errors: errors
      });
      return;
    }

    var Users = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: md5(req.body.password)
    });
    Users.save()
    .then(item => {
      res.render('auth/profile', {user: Users});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
    res.redirect('/product');
}

module.exports.profile = (req, res)=>{
  Order.find({user: req.user}, (err, orders) =>{
    if(err){
      console.log(err);
    }
    var cart;
    orders.forEach((order) =>{
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('auth/profile', {
      orders: orders,
      name: req.signedCookies.name
    });
  });
}