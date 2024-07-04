import { ObjectId } from "mongodb";
import db from "../../../db/connectionDB.js"
// &================================================================

//! signUp
export const signUp = async (req,res,next)=>{
    const {name , email,password,phone} = req.body;
     const customer = {name , email,password,phone}
    const exist = await db.collection("customers").findOne({email});
    if (exist) {
        return res.status(400).json({msg: "Customer already exists"})
    }
    const data = await db.collection("customers").insertOne(customer)
    res.status(201).json({msg:"Done"})
}
// &================================================================
//! signIn
export const signIn = async (req,res,next)=>{
    const {email}= req.body;
    const exist = await db.collection("customers").findOne({email});
    if (exist) {
        return res.status(200).json({msg: "Welcome to your  account"})
    }
    return res.status(400).json({msg: "Customer Not Found"})
    
}
// &================================================================
// ! Get a specific customer
export const getSpecificCust = async (req,res,next)=>{
    const {email}= req.body;
    const customer = await db.collection("customers").find({email}).toArray();
    if (customer) {
        return res.status(200).json({msg: "Done", customer});
    }
    return res.status(400).json({msg: "Customer Not Found"})
    
}
// &================================================================
// ! get all customers
export const getAll = async(req, res, next) =>{
    const data =await db.collection("customers").find().toArray();
    res.status(200).json({msg :"Done", data})

}
// &================================================================
// ! update customer 
export const updateCustomer= async(req, res, next) =>{
    const {id}= req.params;
    const {name,phone} = req.body;
    const customer = await db.collection("customers")
    .updateOne({_id:new ObjectId(id)},{$set:{name,phone}})
    if (customer.modifiedCount === 0)  {
     return res.status(400).json({msg:"Failed To Update",customer})
    
    }
        res.status(200).json({msg:"Done",customer})

}
// &================================================================
// ! delete customer
export const deleteCustomer= async(req, res, next) =>{
    const {id}= req.params;
    const customer = await db.collection("customers")
    .deleteOne({_id:new ObjectId(id)})
    if (customer.deletedCount === 0)  {
     return res.status(400).json({msg:"Failed To delete customer"})
    
    }
        res.status(200).json({msg:"Done",customer})

}






