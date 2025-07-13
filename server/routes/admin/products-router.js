const express = require("express");
const {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/productController");
const { upload } = require("../../helper/cloudinary"); //import multer

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
console.log(upload);

router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProduct)

module.exports = router;
