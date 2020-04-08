require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const Author = require('./models/author.model');
const Product = require('./models/product.model')

const mongooses = require('mongoose');
mongooses.connect('mongodb://localhost:27017/BookStore', { useNewUrlParser: true });

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(flash());
app.use((req, res, next) => {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
  });

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

const port = 3000;
//npm
var jsonParser = bodyParser.json(); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('dasdasdasuygasdf10'));

// router
const routeAuth = require('./routes/auth.route');
const routeProduct = require('./routes/product.route');
const routeCart = require('./routes/cart.route');
const routePayment = require('./routes/payment.route');
const middlewareAuth = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware')
// end 

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req,res) => res.render('index'));
app.get('/tac-gia', async (req, res) =>{
    var author = await Author.find();
    res.render('layouts/author', {
        authors: author
    })
});

app.get('/search', async (req, res) =>{
    let name = req.query.q;
    let product = await Product.find({title: name});
    let differentProduct = await Product.find({detail: "doremon"});
    res.render('products/search', {
        products: product,
        name : name,
        differentProducts: differentProduct
    });   
});

// app use
app.use('/auth', routeAuth);
app.use(sessionMiddleware);
app.use('/product', routeProduct);
app.use('/cart', routeCart);
app.use('', middlewareAuth.requireAuth, routePayment)

app.listen(port, ()=> console.log(`App listen on port ${port}`));
