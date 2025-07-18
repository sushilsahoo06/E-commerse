const product =require('../../models/Product')

const getFilterProduct=async(req,res)=>{
  try{
    const products=await product.find({});

    res.status(200).json({
      success:true,
      data:products
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:"Some error occured !"
    })
  }
}

module.exports={getFilterProduct}