import {MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

client.connect().then(()=>{
    console.log("Connection established to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const db = client.db("carRent")



export default db;






