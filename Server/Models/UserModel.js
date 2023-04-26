import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},
    {timestamps:true}
)

UserSchema.statics.login = async function(username,password){
    const user = await this.findOne({username})

    if(!username || !password){
        throw Error('*All fields must be filled!')
    }if(!user){
        throw Error('*Username does not exist!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('*Passwords doesnot match!')
    }
    return user
}

const UserModel = mongoose.model('users', UserSchema)
export default UserModel