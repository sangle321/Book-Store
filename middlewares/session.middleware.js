let shortid = require('shortid');
const Session = require('../models/session.model');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId){
        let sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        var newSession = new Session({
            sessionId: sessionId
        });

        newSession.save();
    }

    next();
}