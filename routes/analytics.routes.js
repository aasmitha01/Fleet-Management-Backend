import express from "express";
import { analytics } from "../controllers/analytics.controllers.js";
const r=express.Router();
r.get("/",analytics);

export default r;

