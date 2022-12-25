import "../model/mongofile.js"
import * as url from 'url';
import jwt from 'jsonwebtoken';
import userschema  from "../model/schemafile.js"



export var save = async (req,res,next)=>{

    let userdetail= req.body;
    let userlist= await userschema.find()
    let length= userlist.length;
    let id=  length==0?1:userlist[length-1]._id+1;
    userdetail= {...userdetail,"_id":id,"status":0,"role":"user","info":Date()};
    let user= await userschema.create(userdetail);
    if (user)
        return res.status(201).json({msg:"success"});
    else
        return res.status(500).json({error:"server error"});

}

export var fetch= async (req,res,next)=>{
    
    let condition_obj= url.parse(req.url,true).query;
    let userlist= await userschema.find(condition_obj);
    if (userlist)
        return res.status(200).json(userlist);
    else
        return res.status(501).json({msg:"no data exist for this request"})
}

export var deleteuser = async (req,res)=>{
    let userdetail= req.body;
    let user= await userschema.findOne({_id:userdetail._id,password:userdetail.password});
    
    if (user)
       { let ifdelete= await userschema.deleteMany(user);
        if (ifdelete)
            return res.status(200).json(ifdelete)
        else
            return res.status(501).json({error:"user was unable to delete"})
       }
    else
        return res.json({msg:"either your password  or your id is incorrent"})
}

export var updateuser=async(req,res,next)=>{
    let userDetails = await userschema.findOne({_id: req.body._id});
    //console.log(userDetails);
    if(userDetails){
       let id = req.body._id;
       delete req.body._id;
       let user=await userschema.updateOne({_id: id},{$set: req.body});   
       if(user)
        return res.status(201).json({"msg":"success"});
       else
        return res.status(500).json({error: "Server Error"});
    }
    else
     return res.status(404).json({error: "Requested resource not available"});
  }

export var login=async (req,response,next)=>{
  let userDetails=req.body;
  userDetails={...userDetails,"status":0};
  let userlist = await userschema.find(userDetails);
  
  if(userlist.length!=0)
  {
    let payload={"subject":userlist[0].email};  
    let token=jwt.sign(payload,"my token");

    return response.status(201).json({"token":token,"userDetails":userlist[0]});
  }
  else
    return response.status(500).json({"token":"error"});
}