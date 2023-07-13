const moongose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema=new moongose.Schema({
    name:{
        type:String,
        required:[true,"please provide a valid name"],
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:[true,'please provide a valid E-mail'],
        maxlength:50,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide a valid Email ID'],
        unique:true
    },
    passcode:{
        type:String,
        required:[true,"please provide a valid passcode"],
        minlength:5
    }
})

UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
    this.passcode=await bcrypt.hash(this.passcode,salt)
    next();


UserSchema.methods.getName=function(){
    return this.name
}
})

UserSchema.methods.createJWT=function(){
    return jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword=async function(candidatePasscode){
    const isMatch=await bcrypt.compare(candidatePasscode,this.passcode)
    return isMatch
}

module.exports=moongose.model('userdb',UserSchema)
