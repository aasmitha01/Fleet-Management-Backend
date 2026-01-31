const store={};
export const rateLimiter=(req,res,next)=>{
    const ip=req.ip,now=Date.now();
    store[ip]=(store[ip]||[]).filter(t=>now-t<60000);
    if(store[ip].length>=3)
        return
    res.status(429).json({error:"Too many request"})
    store[ip].push(now);
    next();
};