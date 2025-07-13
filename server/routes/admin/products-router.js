const express=require('express');
const {handleImageUpload}=require('../../controllers/admin/productController');
const {upload}=require('../../helper/cloudinary')//import multer

const router=express.Router();

router.post('/upload-image',upload.single('my_file'),handleImageUpload);
console.log(upload)


module.exports=router;