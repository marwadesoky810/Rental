import db from "../../../db/connectionDB.js";
// &================================================================


//! Get all cars whose model is ‘Honda’ and ‘Toyota’ 
export const getModel = async (req,res,next)=>{
    const models = req.query.model ? req.query.model.split(',') : []; 
    const car = await db.collection("cars").find({ model: { $in: models } }).toArray();
    if (car) {
        return res.status(200).json({msg: "Done", car});
    }
    return res.status(400).json({msg: "Car Not Found"})   
}

// &================================================================
// !Get Available Cars of a Specific Model.
export const getAllAva = async(req, res, next) =>{
    const data =await db.collection("cars").find({"status":"available"}).toArray();
    res.status(200).json({msg :"Done", data})

}
// &================================================================
// !Get Cars that are Either rented or of a Specific Model.
export const getEither = async(req, res, next) =>{
    const {model}= req.params;
    const data =await db.collection("cars").find({
        $or: [
          { model: model },
          { status:"rented" }
        ]
      }).toArray()
    res.status(200).json({msg :"Done", data})

}
// &================================================================
// !Get Available Cars of Specific Models or Rented Cars of a Specific Model
export const getCar = async(req, res, next) =>{
    const {model}= req.params;
    const data =await db.collection("cars").find({
        $or: [
            { status: "available", model: model },
          { status:"rented" ,model: model }
        ]
      }).toArray();
    res.status(200).json({msg :"Done", data})

}


