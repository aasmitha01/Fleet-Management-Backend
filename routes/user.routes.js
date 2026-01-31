import express from "express";
import { singup } from "../controllers/user.controllers.js";
const r=express.Router();
r.post("/singup",singup);

export default r;