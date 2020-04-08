const express = require('express')
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.get('/login', controller.login);
router.post('/login', controller.postLogin);

// Sign up
router.get('/sign-up', controller.sign_up);

router.post('/sign-up', controller.postSignUp);

router.get('/profile', controller.profile);
module.exports = router;