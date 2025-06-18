import { db } from "../lib/db.js";

export const create_Announcement = async(req,res) => {
    try {
        const {title , message , courseId } = req.body;
        if(!title || !message){
            return res.status(400).json({message:"data is missing"})
        }

        const userId = req.user.id;
        const data = {
            title,
            message,
            userId:userId
        }

        const announcement = await db.Announcements.create({data})
     
        res.status(201).json({
            message:"created successfully",
            announcement
        })
    } catch (error) {
        res.status(500).json({
            message:"error occured while creating announcement",
            error
        })
        
    }
}

export const get_Announcement = async(req,res) => {
    try {

        const {courseId} = req.query;

        const fetch_announcment = await db.Announcements.findMany({
            where: courseId ? {courseId} : {} ,
            orderBy:{
                createdAt:"desc"
            }
        })

        res.status(200).json({
            message:"announcment fetched succefully",
            announcment:fetch_announcment
        })
        
    } catch (error) {
        res.status(500).json({
            message:"error occured while fetching announcement",
            error
        })
    }
}
