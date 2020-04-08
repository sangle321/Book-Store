const User = require('../models/user.model')

module.exports.requireAuth  = async (req, res, next) => {
    if(!req.signedCookies.userID){
        res.redirect('/auth/login');
        return;
    }

    let user = await User.findOne({_id: req.signedCookies.userID});
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}