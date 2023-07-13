const { BadRequestError, UnauthenticatedError } = require('../errors')
const userdb=require('../models/User')
const {statuscodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')


const register=async (req,res)=>{

    const user=await userdb.create({...req.body})

    const token=user.createJWT()

    res.status(200).json({user:{name:user.name},token})
} 

const login=async (req,res)=>{
    const {email,passcode}=req.body

    if(!email||!passcode){
        throw new BadRequestError('please provide proper credentials')
    }

    const user=await userdb.findOne({email})

    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const ispasscode=await user.comparePassword(passcode)
    if(!ispasscode){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token=user.createJWT()

    res.status(200).json({user:{name:user.name},token})

}



module.exports={
    register,
    login
}