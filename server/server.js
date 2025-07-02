const express=require('express');
const mongoose=require('mongoose');

mongoose.connect(
  'mongodb+srv://sahoosushil456:lgPuiEoeUgO7pXIw@cluster0.mo007z3.mongodb.net/'
)
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log(error))


const app=express();
const PORT=process.env.PORT || 5000;
