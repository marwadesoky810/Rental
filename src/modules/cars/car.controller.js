import db from "../../../db/connectionDB.js";
import { ObjectId } from 'mongodb';
// &================================================================
// ! add car
export const addCar = async (req,res,next)=>{
  const {name ,model} = req.body;
  const car = await db.collection("cars").insertOne({name,model,status:"available"});
  res.status(201).json({msg:"Done",car})
}
// &================================================================
//! get specific car
export const getSpecificCar = async (req,res,next)=>{
    const {id}= req.params;
    const car = await db.collection("cars").find({_id:new ObjectId(id)}).toArray();
    if (car) {
        return res.status(200).json({msg: "Done", car});
    }
    return res.status(400).json({msg: "Car Not Found"})   
}
// &================================================================
// ! get all car
export const getAll = async(req, res, next) =>{
    const data =await db.collection("cars").find().toArray();
    res.status(200).json({msg :"Done", data})
}
// &================================================================
// ! update car
export const updateCar= async(req, res, next) =>{
    const {id}= req.params;
    const {name,model} = req.body;
    const car = await db.collection("cars")
    .updateOne({_id:new ObjectId(id)},{$set:{name,model}})
    if (car.modifiedCount === 0)  {
     return res.status(400).json({msg:"Failed To Update",car})
    
    }
        res.status(200).json({msg:"Done",car})
}
// &================================================================
// ! delete car
export const deleteCar= async(req, res, next) =>{
    const {id}= req.params;
    const car = await db.collection("cars")
    .deleteOne({_id:new ObjectId(id)})
    if (car.deletedCount === 0)  {
     return res.status(400).json({msg:"Failed To delete car"})
    
    }
        res.status(200).json({msg:"Done",car})

}
// &================================================================








