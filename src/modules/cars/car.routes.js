import { Router } from "express";
import * as CarC from "./car.controller.js";

// &================================================================
const router  =Router();
// &================================================================
router.post("/",CarC.addCar);
router.get("/",CarC.getAll);
router.get("/:id",CarC.getSpecificCar);
router.put("/:id",CarC.updateCar);
router.delete("/:id",CarC.deleteCar);




// &================================================================

export default router;