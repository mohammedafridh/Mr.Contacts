import ContactModel from "../Models/ContactModel.js";

//create a contact

export const createContact = async(req,res)=>{

    const {name,contactNumber,image} = req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }if(!contactNumber){
        emptyFields.push('contactNumber')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: '*Please fill all the fields', emptyFields})
    }

    try{
        const existingContact = await ContactModel.findOne({name, user_id:req.user._id})
        if(existingContact){
            throw Error('*Contact name already exists!')
        }
        if(contactNumber.length!==10){
            throw Error('*Contact number must be 10 digits!')
        }
        else{
        const user_id = req.user._id
        const contact = await ContactModel.create({name,contactNumber,image,user_id})
        //const contact = await ContactModel.create(req.body)
        res.status(200).json(contact)
        }

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//get a contact

export const getContact = async(req,res)=>{
    const id = req.params.id
    const contact = await ContactModel.findById(id)

    try{
        if(contact){
            res.status(200).json(contact)
        }else{
            res.status(403).json('Contact not found')
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//get all contacts

export const getAllContacts = async (req, res) => {
    try {
      const searchTerm = req.query.search || ''
      const user_id = req.user._id
  
      const contacts = await ContactModel.find({ name: { $regex: searchTerm, $options: 'i' },
        user_id:user_id
    }).sort({name:1});
  
      res.status(200).json(contacts)
    } catch (error) {
      res.status(500).json({error:error.message})
    }
  }

// update a contact

export const updateContact = async (req, res) => {
    const{name,contactNumber} = req.body
    const contact = await ContactModel.findById(req.params.id)
    let exists

    try {
    // if(name!==contact.name){
    //     exists = await ContactModel.findOne({name})
    // }if(exists){
    //     throw Error('*Contact name already exists!')
    // }
    if(name!==contact.name){
        exists = await ContactModel.findOne({name})
    }if(exists){
        throw Error('Contact Name Exists!')
    }
    if(contactNumber.length!==10){
            throw Error('*Contact number must be 10 digits!')
        }else{
      const contact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(contact)
        }
    } catch (error) {
      res.status(500).json({ error:error.message})
    }
  }

//delete a contact

export const deleteContact = async(req,res)=>{
    try{
        await ContactModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Deleted Successfully')
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

// export const deleteContact = async(req,res)=>{
//     const {id} = req.params

//     try{
//         const contact = await ContactModel.findOneAndDelete({_id: id})
//         res.status(200).json(contact)
//     }catch(error){
//         res.status(500).json(error)
//     }
// }
