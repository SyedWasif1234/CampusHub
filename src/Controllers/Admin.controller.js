import { db } from "../lib/db.js";


export const list_all_users = async(req, res) =>{
    try {
        //filter by role
        const {role} = req.query

        const list_of_all_users = await db.User.findMany({
            where:role?{role}:{},
            select:{
                id:true,
                name:true,
                email:true,
                enrollement_number:true,
                role:true,
                createdAt:true,
                updatedAt: true,
            }
        });
        console.log(list_of_all_users)
        res.status(200).json({
            message:"all user data fetched successfully",
            users:list_of_all_users
        })
    } catch (error) {
        res.status(500).json({
            message:"error occured while fetching all user details",
            error
        })
        
    }
}

export const change_user_role = async(req, res) =>{
    try {
        const {userId} = req.params
        const {role }= req.body;

        const existed_user = await db.User.findUnique({
            where:{id:userId}
        })
        
        if(!existed_user) return res.status(400).json({message:"user not exists" });

        const update_role = await db.User.update({
            where:{id:userId},
            data:{
                ...(role && {role})
            }
        })

        res.status(200).json({
            message:"user role updated successfully",
            user:update_role
        })
    } catch (error) {
        res.status(500).json({
            message:"error occured while updating the user role ",
            error
        })
    }
}
