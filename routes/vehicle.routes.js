import express from "express";
import { addVehicle,assignDriver,getVehicle } from "../controllers/vehicle.controllers.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
const r=express.Router();
r.post("/add",rateLimiter,addVehicle);
r.patch("/assign-driver/:vehicleId",assignDriver);
r.get("/:vehicleId",getVehicle);

export default r;
