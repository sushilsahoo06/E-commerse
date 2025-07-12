const { imageUploadUtill } = require("../../helper/cloudinary");

async function handleImageUpload(req,res) {
  try{
    const bs4=Buffer.from(req.file.Buffer).toString('base64');
    const url='data'+req.file.mimetype+'base64'+bs4;

    const result=await imageUploadUtill(url)

    res.json({
      success:true,
      result
    })

  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
      message:"error Occured"
    })
  }
}

module.exports=handleImageUpload;