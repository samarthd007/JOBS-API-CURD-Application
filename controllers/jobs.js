
const { BadRequestError, NotFoundError } = require('../errors')
const jobdb=require('../models/Job')


const getAllJobs=async (req,res)=>{
    const job=await jobdb.find({CreatedBy:req.user.userID}).sort({createdAt:-1});

    res.status(200).json({job,count:job.length})

}

const getJob=async (req,res)=>{
    res.send('Get a jobs ')
}

const updateJob=async (req,res)=>{
    res.send('update jobs ')
}

const createJob=async (req,res)=>{
    req.body.CreatedBy=req.user.userID
    const job=await jobdb.create(req.body)

    res.status(200).json({job})
}

const deleteJobs=async (req,res)=>{
    res.send('Delete a  jobs ')
}



module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJobs
}