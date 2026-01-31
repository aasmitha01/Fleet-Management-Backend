import { supabase } from "../config/supabase.js";

export const addVehicle=async(req,res)=>{
  const {owner_id,name,registration_number,
         allowed_passengers,rate_per_km}=req.body;

  const {data:owner}=await supabase.from("users")
    .select("*").eq("id",owner_id).single();
  if(!owner || owner.role!=="owner")
    return res.status(403).json({error:"Only owner can add vehicle"});

  const {error}=await supabase.from("vehicles").insert([{
    owner_id,name,registration_number,
    allowed_passengers,rate_per_km
  }]);
  if(error) return res.status(400).json({error:error.message});
  res.status(201).json({message:"Vehicle added"});
};

export const assignDriver=async(req,res)=>{
  const {vehicleId}=req.params;
  const {driver_id}=req.body;

  const {data:driver}=await supabase.from("users")
    .select("*").eq("id",driver_id).single();
  if(!driver || driver.role!=="driver")
    return res.status(400).json({error:"Invalid driver"});

  await supabase.from("vehicles")
    .update({driver_id}).eq("id",vehicleId);
  res.json({message:"Driver assigned"});
};

export const getVehicle=async(req,res)=>{
  const {data}=await supabase.from("vehicles")
    .select("*").eq("id",req.params.vehicleId).single();
  if(!data) return res.status(404).json({error:"Not found"});
  res.json(data);
};
