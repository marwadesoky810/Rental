import { Router } from "express";
import * as CC from "./customer.controller.js";
// &================================================================
const router =   Router();
// &================================================================
router.post("/" ,CC.signUp );
router.get("/" ,CC.signIn );
router.get("/specific" ,CC.getSpecificCust );
router.get("/all" ,CC.getAll );
router.put("/:id" ,CC.updateCustomer );
router.delete("/:id" ,CC.deleteCustomer);

// &================================================================
export default router;