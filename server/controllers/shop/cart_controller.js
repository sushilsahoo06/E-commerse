const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
//Check if cart exists for the user
    let cart = await Cart.findOne({ userId });
    //If the user doesn't already have a cart, a new one is created.
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
//Check if product is already in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity: Number(quantity) });
    } else {
      cart.items[findCurrentProductIndex].quantity += Number(quantity);
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};


const fetchCardItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId not found!",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price ",
    });
    if (!cart) {
     return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }
    //if the admon side the product have been delated

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,//This spreads the raw document data (excluding Mongoose methods) into the data object.
        items: populateCartItems,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};
const removeToCart = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};
const updateCardItems = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = {
  addToCart,
  removeToCart,
  dispatchCardItems,
  updateCardItems,
};
