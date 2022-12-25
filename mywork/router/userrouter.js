import express from "express";
import * as usercontroller from "../controller/usercontroller.js";

const router = express.Router();

router.post("/save",usercontroller.save);
router.get("/fetch",usercontroller.fetch);
router.delete("/delete",usercontroller.deleteuser);
router.patch("/update",usercontroller.updateuser);
router.post("/login",usercontroller.login);


export default router;