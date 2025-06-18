# CampusHub
A backend API for a campus portal system where users have different roles (Student, Faculty, Admin). Each role has specific permissions to access and modify resources like announcements, results, events, and course materials.  This project helps to understand RBAC, multi-role workflows, and proper access restrictions.

👥 Roles Involved

    Student: View announcements, results, courses
    Faculty: Upload course materials, post announcements
    Admin: Manage users, publish results, full access

📊 Tables to be Created

    users (with role: student, faculty, admin)
    api_keys
    announcements
    results
    courses
    materials

🧾 API Routes to Build

🔐 Auth & API Key:

    POST /auth/register → Register user with a role (default: student)
    POST /auth/login → Login, return JWT
    POST /auth/api-key → Generate API key
    GET /auth/me → Get current user profile

📢 Announcements:

    POST /announcements → Faculty/Admin only
    GET /announcements → Accessible to all roles

🎓 Results:

    POST /results → Admin only
    GET /results/:studentId →
    Student: Only own results
    Faculty/Admin: Any student's results

📚 Courses & Materials:

    GET /courses → All roles
    POST /courses → Admin only
    POST /courses/:courseId/materials → Faculty only
    GET /courses/:courseId/materials → Students & faculty

⚙ Admin-only:

    GET /admin/users → List all users
    PUT /admin/users/:id/role → Change user role

🛡 RBAC Middleware Flow

    Use middleware like checkRole(['admin', 'faculty'])
    Protect each route based on allowed roles
    Combine JWT + API key middleware



📊 Tables 

    users (with role: student, faculty, admin)
    api_keys
    announcements
    results
    courses
    materials

🎯 Covered

    Express.js API with robust RBAC system
    JWT authentication
    API key requirement
    Role-based route protection
    Postman collection showing user flows for each role
    Modular, clean, production-quality backend

MODELS RELATION :-

    📊 Summary Table

        Relation_Type	        Model A	                Model B	                        Relation

        1 : M	                  User	                 ApiKey	                user.apiKeys ↔ apiKey.user
        1 : M	                User (faculty)	         Courses	             user.course ↔ courses.user
        M : M (via Enrollment)	User (student)	         Courses	            user.enrollments ↔ courses.enrollments
        M : M (via Results)	    User (student)	         Courses	             user.result ↔ courses.results
        1 : M	                    User	           Announcements	        user.announcements ↔ announcement.user
        1 : M	                  Courses	            Announcements            courses.announcements ↔ announcement.course
        1 : M	                    User	              Materials	            user.materials ↔ materials.user
        1 : M	                  Courses	              Materials	            courses.materials ↔ materials.course


🐱‍👤Dependencies:

    npm init
    npm i nodemon
    npm i Express
    npm i dotenv
    npm install prisma --save-dev 
    npm install @prisma/client    
    npx prisma init
    npm i cookie-parser  
    npm i bcryptjs
    npm i jsonwebtoken
