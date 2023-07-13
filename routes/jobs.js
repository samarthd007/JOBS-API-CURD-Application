const express=require('express')
const { createJob, getAllJobs, getJob, deleteJobs, updateJob } = require('../controllers/jobs')
const router=express.Router()

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJobs).patch(updateJob)

module.exports=router