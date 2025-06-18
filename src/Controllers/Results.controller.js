
import { db } from "../lib/db.js"

export const createResult = async (req, res) => {
  try {
    const { userId, courseId, marks, status } = req.body;

    if (!userId || !courseId || marks === undefined || !status) {
      return res.status(400).json({ message: "something is missing in create result body" });
    }

    // Check if course exists
    const course = await db.Courses.findUnique({
      where: { id: courseId },
      select: { name: true, code: true }
    });

    if (!course) {
      return res.status(400).json({ message: "no such course with this course id exists" });
    }

    // Check if result already exists for same user and course
    const alreadyExists = await db.Results.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });

    if (alreadyExists) {
      return res.status(409).json({ message: "Result already exists for this user and course" });
    }

    const result = await db.Results.create({
      data: {
        userId,
        courseId,
        marks,
        status
      }
    });

    res.status(201).json({
      message: "result created successfully",
      course,
      result
    });

  } catch (error) {
    res.status(500).json({
      message: "error occurred while creating result",
      error
    });
  }
};


export const get_own_result = async(req , res) =>{
    try {
        const userId = req.user.id;

        const user_result = await db.Results.findMany({
          where: { userId: userId },
          select: {
            marks: true,
            status: true,
            course: {
              select: {
                name: true,
                code: true,
                semester: true,
                department: true
              }
            }
          }
        });

        res.status(200).json({
            message:"result fetched succefully",
            result:user_result
        })

    } catch (error) {
        res.status(500).json({
            message:"error occured while fetching the result",
            error
        })
    }
}

export const get_any_student_result = async(req , res) =>{
    try {

        const {userId} = req.params;
        
        const exited_user = await db.User.findUnique({where:{id:userId}})
        if(!exited_user) return res.status(400).json({message:"user of this id not exists"});

        const result = await db.Results.findMany({
            where:{userId:userId}
        })

        res.status(200).json({
            message:"result fetched successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"error occured while fetching result by admin or faculty ",
            error
        })
        
    }
}

