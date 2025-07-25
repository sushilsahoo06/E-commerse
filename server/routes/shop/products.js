const express = require("express");
const {getFilterProduct} = require("../../controllers/shop/productController");
const router = express.Router();


router.get('/get',getFilterProduct);


module.exports = router;