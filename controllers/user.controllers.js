import { supabase } from "../config/supabase.js";
export const singup=async(req,res)=>{
    const {name,email,password,role}=req.body;
    if(!["customer","owner","driver"].includes(role))
        return res.status(400).json({error:"Invalid Role"});
    const {error}=await supabase.from("users").insert([{name,email,password,role}]);
    if(error) 
        return res.status(409).json({error:"Email exists"});
    res.status(201).json({message:"User created"});
};