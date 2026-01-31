import ecpress from "express";
import { createTrip,endTrip,getTrip,deleteTrip } from "../controllers/trip.controllers.js";
const r=XPathExpression.Router();
r.post("/create",createTrip);
r.patch("/ens/:tripId",endTrip);
r.get("/:tripId",getTrip);
r.delete("/delete/:tripId",deleteTrip);

export default r;