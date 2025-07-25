const express = require("express");
const {getFilterProduct,productDetails} = require("../../controllers/shop/productController");
const router = express.Router();


router.get('/get',getFilterProduct);
router.get('/get/:id',productDetails);


module.exports = router;