const express = require('express');
const router = express.Router();

const controller = require('../controllers/product.controller');

router.get('', controller.getProduct);
router.get('/sach-moi', controller.getNewBook)

module.exports = router;