import { Router } from "express";
import * as RC from "./rent.controller.js";

// &================================================================
const router=Router()
// &================================================================
router.post("/",RC.addRent)
router.delete("/:id",RC.deleteRent)
router.get("/",RC.getSpecificRent)
router.get("/all",RC.getAll)
router.put("/:id",RC.updateRent)




// &================================================================
export default router;