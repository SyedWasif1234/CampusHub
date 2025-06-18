import { log } from "console";
import { db } from "../lib/db.js";

/*
GET /courses → All roles
POST /courses → Admin only
POST /courses/:courseId/materials → Faculty only
GET /courses/:courseId/materials → Students & faculty
*/

export const create_course = async(req , res) => {
    try {

        const{name , code , description , creditHours , semester , department , facultyId } = req.body;
        if(!name || !code || !description || !creditHours || !semester||  !department ||!facultyId){
            return res.status(400).json({
                message:"something is missing"
            })        
        }

        const course = await db.Courses.create({
            data:{
                name,
                code,
                description,
                creditHours,
                semester,
                department,
                userId:facultyId
            }
        })
        console.log(course);
        
        res.status(200).json({
            message:"created successfully",
            course
        })
        
    } catch (error) {
        res.status(500).json({
            message:"error occured while creating course",
            error
        })
    }
}    

export const course_Enrollment = async(req, res)=>{
    try {
        const userId = req.user.id
        const {courseId} = req.params;
        if(!courseId) return res.status(400).json({message:"courseId is missing"})

        const Enrollment = await db.Enrollment.create({
            data:{
                userId:userId,
                courseId:courseId
            }
        })

       const updated_course_detail = await db.Courses.update({
        where:{id:courseId},
         data: {
            enrolledUsers: {
            increment: 1,
            },
          },
       })     

        res.status(201).json({
            message: "Enrollment successful",
            Enrollment,
        });


    } catch (error) {
        res.status(500).json({
        message: "Enrollment failed",
        error,
        });
    }
}
export const get_course = async (req , res) =>{
    try {
        const list_of_courses = await db.Courses.findMany()
         let x=1

        res.status(200).json({
            message:"corses fetched succefully",
            list_of_courses
        })
    } catch (error) {
        res.status(500).json({
        message: "error occured while fetching the courses",
        error,
        });
    }
}

export const create_materials = async (req , res) =>{
    try {
        const {courseId} = req.params;
        
        const {title , description , fileUrl ,type } = req.body ;
        if(!title || !description || !fileUrl || !type){
            return res.status(400).json({
                message:"every field is required"
            })
        }
       
        const facultyId = req.user.id;

        const course_material = await db.Materials.create({
            data:{
                title,
                description,
                fileUrl,
                type,
                courseId:courseId,
                userId:facultyId
            }
        })

        res.status(200).json({
            message:"material for particuler course added succesfully",
            material:course_material
        })

    } catch (error) {
        res.status(500).json({
            message:"error occured while creating course material",
            error
        }) 
    }
}

export const get_material = async (req , res) =>{
    try {
        const userId = req.user.id;
        const {courseId  }= req.params;
       
        if(!courseId) return res.status(400).json({message:"courseId is missing"});

        const checking_for_course_Enrollment = await db.Enrollment.findUnique({
            where:{
                 userId_courseId: {
                    userId,
                    courseId
                }
            }
        })
        if(!checking_for_course_Enrollment) {
            return res.status(400).json({
                message:"you have to enroll in a course to see materials"
            })
        }

        const materials = await db.Materials.findMany({
            where:{
                courseId:courseId
            },
            include:{
                course:{
                    select:{
                        name:true,
                        code:true
                    }
                }
            }
        })
        res.status(200).json({
            message:"materials fetched successfully",
            material:materials
        })
    } catch (error) {
        res.status(500).json({
            message:"error occured while fetching material",
            error
        })
    }
}



