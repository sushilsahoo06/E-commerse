const express=require('express')
const {registerUser} =require('../../controllers/auth/Auth-controllers')

const router=express.Router();

router.post('/register',registerUser);
module.exports=router;