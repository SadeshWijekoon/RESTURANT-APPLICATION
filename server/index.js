import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'

const app = express()

app.use(express.json())

const PORT = 5000 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

