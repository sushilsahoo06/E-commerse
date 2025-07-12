const cloudinary=require('cloudinary').v2;
const multer=require('multer');

cloudinary.config({
  cloud_name:'dd55tuxti',
  api_key:'385519392265553',
  api_secret:'oGy2vQV_QBiIR2cujTHmfYXHj1Y'
});

const storage=new multer.memoryStorage();

async function imageUploadUtill(file){
  const result=await cloudinary.uploader.upload(file,{
    resource_type:'auto'
  });

  return result;
}

const upload=multer({storage});

module.exports={upload,imageUploadUtill}