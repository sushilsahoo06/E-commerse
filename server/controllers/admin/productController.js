const { imageUploadUtill } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

async function handleImageUpload(req, res) {
  try {
    const bs4 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${bs4}`;

    const result = await imageUploadUtill(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error Occured",
    });
  }
}
//add anew product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyProduct.save();

    res.status(201).json({
      success: true,
      message: "error occured",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all product
const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const findProduct = await Product.findById(id);

    if (!findProduct)
      return res.status(404).json({
        success: true,
        message: "Product not found",
      });
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success:true,
      message:"Can't find ID!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id)
    if(!product){
      res.status(200).json({
        success:false,
        message:"Product not found"
      })
    }
  res.status(200).json({
    success:true,
    message:'Product delete successfully'
  })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  deleteProduct,
  editProduct,
};
