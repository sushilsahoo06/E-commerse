const express = require("express");
const {
  addToCart,
  fetchCardItems,
  removeToCart,
  updateCardItems,
} = require("../../controllers/shop/cart_controller");

const router=express.Router();

router.post('/add',addToCart);
router.get('/get/:userId',fetchCardItems);
router.put('/update-cart',updateCardItems);
router.delete('/:userId/:productId',removeToCart);

module.exports=router;