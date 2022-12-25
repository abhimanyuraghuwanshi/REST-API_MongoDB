import mongoose from "mongoose";


(mongoose.connect("mongodb://127.0.0.1:27017/mywork")).then(()=>{console.log("connected to mongodb")}).catch(()=>{console.log("err in mongodb")});


