import  express from "express";
import bodyparser from "body-parser";


const app = express();

app.use(bodyparser());


//user routing files are in folder
import userrouter from "./router/userrouter.js";
app.use("/user", userrouter);



var port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("listening on 3000")
})