import { supabase } from "../config/supabase.js";

export const analytics=async(req,res)=>{
  const c=await supabase.from("users").select("*",{count:"exact",head:true}).eq("role","customer");
  const o=await supabase.from("users").select("*",{count:"exact",head:true}).eq("role","owner");
  const d=await supabase.from("users").select("*",{count:"exact",head:true}).eq("role","driver");
  const v=await supabase.from("vehicles").select("*",{count:"exact",head:true});
  const t=await supabase.from("trips").select("*",{count:"exact",head:true});
  res.json({customers:c.count,owners:o.count,drivers:d.count,vehicles:v.count,trips:t.count});
};
