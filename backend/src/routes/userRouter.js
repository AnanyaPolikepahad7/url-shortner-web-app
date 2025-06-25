// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
// import {user} from '../models/user/user.model.js'; // Adjust the import path as necessary
// Ensure you have the correct import for your user model

const userRouter = Router();
userRouter.get("/me", (req, res) => {
  res.json({user:"user details"} )
})

userRouter.post("/", (req, res) => {
    try{
        const {name,email}= req.body;
        if(!name || !email){
            return res.status(400).json({message: "Name ot email missing"});
        }

        let newUser=new User({name,email});
        newUser.save();
        return res.status(200).send({status:"user got created",newUser})
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

export default userRouter;