import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRoute from './Routes/UserRoutes.js'
import contactRoute from './Routes/ContactRoute.js'
import multer from "multer";

//express app
const app = express()

app.use(express.json({limit:'10mb'}))

dotenv.config()

//middleware for image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `image-${Date.now()}.${ext}`);
    }
  });
  
const upload = multer({ storage: storage });

//connect db

mongoose.connect(process.env.DB, {
    useNewUrlParser:true
}).then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening at port ${process.env.PORT}`)))
.catch((error)=>
    console.log(error)
)

//connect routes
app.use('/users', userRoute)
app.use('/contact', contactRoute)