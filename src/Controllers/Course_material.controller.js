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
        console.log("errro occured in creating course controller",error);
        res.status(500).json({
            message:"error occured while creating course",
            error
        })
    }
}    

export const course_Enrollment = async(req, res)=>{
    try {
        const userId = req.user.id
        const {courseId} = req.body

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

       console.log(updated_course_detail);
       

        res.status(201).json({
            message: "Enrollment successful",
            Enrollment,
        });


    } catch (error) {
        console.error("Enrollment failed:", error);
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
        list_of_courses.map((course)=>{
            console.log(`course${x}: ${JSON.stringify(course,null,2)}`)
            x++;
        })
        res.status(200).json({
            message:"corses fetched succefully",
            list_of_courses
        })
    } catch (error) {
        console.error("error occured while fetching the courses:", error);
        res.status(500).json({
        message: "error occured while fetching the courses",
        error,
        });
    }
}

export const create_materials = async (req , res) =>{}

export const get_material = async (req , res) =>{}



