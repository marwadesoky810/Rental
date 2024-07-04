import db from "../../../db/connectionDB.js";
import { ObjectId } from 'mongodb';
// &================================================================
// ! create rent
export const addRent = async(req,res,next) =>{
   const {carId ,customerId, rentDate , returnDate}= req.body;
   const customerExist = await db.collection("customers").findOne({
    _id:new ObjectId(customerId)
    });
    //~ customerExist
    if (!customerExist) {
        return res.status(404).json({msg :"Customer not found"})
    }
    // ~ carExist
   const carExist = await db.collection("cars").findOne({
    _id:new ObjectId(carId), status: "available"});
    if (!carExist) {
        return res.status(404).json({msg :"Car not found Or Rented"})
    }
    
    if (new Date(returnDate) > new Date(rentDate)) {
        return res.status(404).json({msg :"Return date must be geater than rented date"})
    }

    const rent = await db.collection('rents').insertOne({
        carId: new ObjectId(carId),
        customerId: new ObjectId(customerId),
        rentDate: rentDate,
        returnDate: returnDate
    })
    await db.collection("cars").updateOne({_id:new ObjectId(carId)},{
        $set :{status :"rented"}
    })
    res.status(201).json({msg:"Done"})
}
// &================================================================
// ! delete rent car
export const deleteRent= async (req, res,next) => {
    const {id} = req.params;
    const {carId} = req.body;
    const rent = await db.collection('rents').findOneAndDelete({
        _id:new ObjectId(id)
    })
    
    await db.collection('cars').updateOne({_id:new ObjectId(carId)},{$set :{status:"available"}})
return res.status(200).json({msg:"Done"})
}
// &================================================================
// ! Get a specific rental
export const getSpecificRent = async (req,res,next)=>{
    const {id}= req.body;
    const rent = await db.collection("rents").find({_id: new ObjectId(id)}).toArray();
    if (rent) {
        return res.status(200).json({msg: "Done", rent});
    }
    return res.status(400).json({msg: "Rental Not Found"})
    
}
// &================================================================
// ! get all Rents
export const getAll = async(req, res, next) =>{
    const data =await db.collection("rents").find().toArray();
    res.status(200).json({msg :"Done", data})

}
// &================================================================
// ! update rental 
export const updateRent= async(req, res, next) =>{
    const {id}= req.params;
    const {rentDate,returnDate} = req.body;
    if (new Date(returnDate) > new Date(rentDate)) {
        return res.status(404).json({msg :"Return date must be geater than rented date"})
    }
    else{
        const rent = await db.collection("rents")
        .updateOne({_id:new ObjectId(id)},{$set:{rentDate,returnDate}})
        if (rent.modifiedCount === 0)  {
         return res.status(400).json({msg:"Failed To Update",rent})
        
        }
            res.status(200).json({msg:"Done",rent})
    
    }
    
}


















