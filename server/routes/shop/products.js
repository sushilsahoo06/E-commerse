const express = require("express");
const {getFilterProduct} = require("../../controllers/shop/productController");
const router = express.Router();


router.post('/shop',getFilterProduct);


module.exports = router;