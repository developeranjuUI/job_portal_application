import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import {v2 as cloudinary} from 'cloudinary';

export const getUserData = async (req,res) => {
    const userId = req.auth.userId;

    try {
        
        const user = await User.findById(userId)

        if(!user){
            return res.json({success: false, message: 'User not found'})
        }
        req.json({success: true,user})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const applyForJob = async (req,res) => {
    const {jobId} = req.body

    const userId = req.auth.userId

    try {
        const isAlreadyApplied = await JobApplication.find({jobId,userId})
        if(isAlreadyApplied.length > 0){
            return res.json({success:false,message:'Already applied'})
        }
        const jobData = await Job.findById(jobId)

        if(!jobData) {
            return res.json({success: false, message: 'Job not found'})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({success: true, message: 'Applied successfully'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getUserJobApplications = async (req,res) => {
    try {
        
        const userId = req.auth.userId
        const application = await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()
        if(!application){
            return res.json({success: false, message: 'No Job applications found'})
        }

        return res.json({success: true, application})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateUserResume = async (req,res) => {
    try {
        
        const userId = req.auth.userId
        const resumeFile = req.file
        const userData = await User.findById(userId)

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success: true, message: 'Resume updated'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}