import fs from "fs";
export const logger=(req,res,next)=>{
    fs.appendFileSync("logs.txt",`${new Date().toISOString()} ${req.method} ${req.url}\n`); 
    next();
};
