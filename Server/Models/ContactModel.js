import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    image:String,
    address:String,
},
    {timestamps:true}
)

const ContactModel = mongoose.model('contacts', ContactSchema)
export default ContactModel;