import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./Routes/Auth.router.js"
import announcementRouter from "./Routes/Announcement.router.js"
import adminRouter from "./Routes/Admin.router.js"
import resultRouter from "./Routes/Result.router.js"
import course_materialRouter from "./Routes/Course_material.router.js"


dotenv.config({
    path:"./.env"
})

const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/announcement" , announcementRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/result", resultRouter)
app.use("/api/v1/courses", course_materialRouter)



app.listen(port , ()=>{
    console.log(`Server started at port ${port}`)
})