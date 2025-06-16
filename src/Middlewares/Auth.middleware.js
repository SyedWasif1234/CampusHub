import jwt from "jsonwebtoken";
import { db } from "../lib/db.js";

export const authMiddleware = async(req , res , next) => {
    try {
        const token = req.cookies.jwt ;
        if(!token){
            return res.status(400).json({
                message:"plz login"
            })
        }

        const Decode_Token = jwt.verify(token , process.env.JWT_SECRET)

        const user = await db.User.findUnique({
            where:{id : Decode_Token.id},
            select:{
                id:true ,
                name:true,
                email:true,
                role:true
            }
        })

        req.user = user
        next()
    } catch (error) {
        res.status(400).json({
            message:"error occured in auth middleware"
        })
    }
}


export const Check_Admin = async(req, res , next) =>{
    try {
        const user_role = req.user.role;
        if(user_role === "ADMIN"){
            next()
        } else {
            res.status(400).json({message:"Unouthorised"})
        }
       
    } catch (error) {
        res.status(400).json({
            message:"error occured in check admin middleware"
        })
    }
}

export const Check_Faculty_Admin = (req , res , next) => {
    try {

        const user_role = req.user.role;
        if(user_role === "FACULTY" || user_role === "ADMIN"){
            next()
        } else {
            res.status(400).json({message:"Unouthorised"})
        }
        
    } catch (error) {
        res.status(500).json({message:"error occured in check_faculty middleware"})
    }
}

export const Check_Faculty = (req , res , next) => {
    try {

        const user_role = req.user.role;
        if(user_role === "FACULTY" ){
            next()
        } else {
            res.status(400).json({message:"Unouthorised"})
        }
        
    } catch (error) {
        res.status(500).json({message:"error occured in check_faculty middleware"})
    }
}


export const apiKeyAuthMiddleware  = async (req, res , next) => {
    try {
        
        const apiKey = req.headers['x-api-key'];
        console.log("api key in aapi key middleware :", apiKey)
        if(!apiKey){
            res.status(401).json({message:"Api Key is missing"})
        }

        const keyRecord = await db.ApiKey.findUnique({
            where: { key: apiKey },
            include: { user: true },
        }); 

        if(!keyRecord || !keyRecord.isActive){
            return res.status(403).json({ message: "Invalid or inactive API key" });
        }

        if(keyRecord.role === "BLOCKED"){
            return res.status(403).json({ message: "his API key has been blocked" });
        } 

         req.apiKeyRole = keyRecord.role;

        next()

    } catch (error) {
        console.log("error occured in api key middleware" , error);
        return res.status(500).json({message:"error occured in api key middleware"},error)
    }
}