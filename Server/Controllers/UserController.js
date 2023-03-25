import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import UserModel from '../Models/UserModel.js'

const createToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET, {expiresIn:'3d'})
}

//register user

export const registerUser = async(req,res)=>{
    const{username,password} = req.body

    const exists  = await UserModel.findOne({username})
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    try{
        if(!username || !password){
            throw Error('*All Fields Must Be Filled!')
        }
        if(exists){
            throw Error('*Username Exists. Please try another!')
        }
        if(!validator.isStrongPassword(password)){
            throw Error('*Password is not strong enough!')
        }else{
            const user = await UserModel.create({username,password:hash})
            const token = createToken(user._id)
            res.status(200).json({user,token})
        }

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//login user

export const loginUser = async(req,res)=>{
    const{username,password} = req.body

    try{
        const user = await UserModel.login(username,password)
        const token = createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}