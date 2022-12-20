import { Router } from "express";

export const router = Router();
export default router;

import user from "./user"; 
router.use("/user", user);

import post from "./post"; 
router.use("/post", post);