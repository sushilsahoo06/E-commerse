const product =require('../../models/Product')

const getFilterProduct=async(req,res)=>{
  try{
    const {category=[],brand=[],sortBy='price-lowtohigh'}=req.query;
  
    let filters={};
    
    if(category.length >0){
      filters.category={$in:category.split(',')}
    }
    if(brand.length >0){
      filters.brand={$in:brand.split(',')}
    }
    let sort={};

    
    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price=1
        break;
      case 'price-hightolow':
        sort.price=-1
        break;
      case 'title-atoz':
        sort.title=1
        break;
      case 'title-ztoa':
        sort.title=-1
        break;
    
      default:
        sort.price=1;
        break;
    }
    const products=await product.find(filters).sort(sort);
    

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
const productDetails=async (req,res)=>{
  try{
    const{id}=req.params;
    const product=await product.findById(id)
    if(!product){
      res.status(404).json({
        success:false,
        message:"product not found!"
      })
    }
    res.status(200).json({
      success:true,
      data:product
    })
  }catch(e){
    console.log(e);
    res.status(500).json({
      success:false,
      message:"some error Occured!"
    })
  }
}

module.exports={getFilterProduct,productDetails}