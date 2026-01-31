import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { logger } from "./middlewares/logger.js";

import userRoutes from "./routes/user.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app=express();
app.use(express.json());
app.use(logger);

app.use("/users",userRoutes);
app.use("/vehicles",vehicleRoutes);
app.use("/trips",tripRoutes);
app.use("/analytics",analyticsRoutes);

app.use((req,res)=>res.status(404).json({error:"This Request Is Not Found"}));

app.listen(process.env.PORT,()=>console.log("Server running"));
