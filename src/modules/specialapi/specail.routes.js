import { Router } from "express";
import { getAllAva, getCar, getEither, getModel } from './specil.cotroller.js';
// &================================================================

const router =Router()
// &================================================================


router.get("/",getModel);
router.get("/avaliable",getAllAva);
router.get("/:model",getEither);
router.get("/car/:model",getCar);


// &================================================================

export default router;