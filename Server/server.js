import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRoute from './Routes/UserRoutes.js'
import contactRoute from './Routes/ContactRoute.js'

//express app
const app = express()

app.use(express.json())

dotenv.config()

//connect db

mongoose.connect(process.env.DB, {
    useNewUrlParser:true
}).then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening at port ${process.env.PORT}`)))
.catch((error)=>
    console.log(error)
)

//connect routes
app.use('/user', userRoute)
app.use('/contact', contactRoute)