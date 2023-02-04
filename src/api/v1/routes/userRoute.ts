import { Router } from "express";
const router = Router()

router.get("/signin", (_req, res)=>{
  res.send("This is signin route")
})

export default router;