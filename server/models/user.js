const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  userName:{
    type:'string',
    required:'true',
    unique:'true'
  },
  email:{
    type:'string',
    required:true,
    unique:true,
  },
  password:{
    type:'string',
    default: true
  },
  role:{
    type:'string',
    default:'user'
  }
})

const user=mongoose.model('user',userSchema);
module.export=user;