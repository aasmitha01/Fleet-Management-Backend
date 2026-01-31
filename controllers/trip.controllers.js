import { supabase } from "../config/supabase.js";

export const createTrip=async(req,res)=>{
  const {customer_id,vehicle_id,distance_km,
         passengers,location,start_date,end_date}=req.body;

  const {data:customer}=await supabase.from("users")
    .select("*").eq("id",customer_id).single();
  if(!customer || customer.role!=="customer")
    return res.status(403).json({error:"Only customer can create trip"});

  const {data:v}=await supabase.from("vehicles")
    .select("*").eq("id",vehicle_id).single();

  if(!v || !v.isAvailable)
    return res.status(400).json({error:"Vehicle not available"});
  if(passengers>v.allowed_passengers)
    return res.status(400).json({error:"Too many passengers"});

  await supabase.from("trips").insert([{
    customer_id,vehicle_id,distance_km,
    passengers,location,start_date,end_date
  }]);

  await supabase.from("vehicles")
    .update({isAvailable:false}).eq("id",vehicle_id);

  res.status(201).json({message:"Trip created"});
};

export const endTrip=async(req,res)=>{
  const {tripId}=req.params;
  const {data:t}=await supabase.from("trips")
    .select("*").eq("id",tripId).single();
  const {data:v}=await supabase.from("vehicles")
    .select("*").eq("id",t.vehicle_id).single();

  const cost=t.distance_km*v.rate_per_km;

  await supabase.from("trips")
    .update({isCompleted:true,tripCost:cost})
    .eq("id",tripId);

  await supabase.from("vehicles")
    .update({isAvailable:true}).eq("id",t.vehicle_id);

  res.json({tripCost:cost});
};

export const getTrip=async(req,res)=>{
  const {data}=await supabase.from("trips")
    .select("*").eq("id",req.params.tripId).single();
  if(!data) return res.status(404).json({error:"Not found"});
  res.json(data);
};

export const deleteTrip=async(req,res)=>{
  await supabase.from("trips")
    .delete().eq("id",req.params.tripId);
  res.json({message:"Trip deleted"});
};
