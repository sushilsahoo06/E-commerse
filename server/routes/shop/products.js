const express = require("express");
const {getFilterProduct} = require("../../controllers/shop/productController");
const router = express.Router();


router.post('/get',getFilterProduct);


module.exports = router;