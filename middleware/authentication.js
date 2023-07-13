const { UnauthenticatedError } = require('../errors')
const userdb=require('../models/User')
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const  authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authorization Invalid')
    }
    const token =authHeader.split(' ')[1]

    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        req.user={userID:payload.userID,name:payload.name}
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authorization Invalid')
    }
}

module.exports=auth 