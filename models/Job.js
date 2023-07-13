const moongose=require('mongoose')

const JobSchema=new moongose.Schema({
    company:{
        type:String,
        required:[true,'Please enter the name of your Company'],
        maxlength:50
    },
    position:{
        type: String,
        required:[true,'please provide position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    CreatedBy:{
        type:moongose.Types.ObjectId,
        ref:'userdb',
        required:[true,'please provide user']
    },
},{timestamps:true})


module.exports=moongose.model('jobdb',JobSchema);