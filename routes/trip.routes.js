import express from "express";
import { createTrip,endTrip,getTrip,deleteTrip } from "../controllers/trip.controller.js";
const r=express.Router();
r.post("/create",createTrip);
r.patch("/end/:tripId",endTrip);
r.get("/:tripId",getTrip);
r.delete("/delete/:tripId",deleteTrip);
export default r;
