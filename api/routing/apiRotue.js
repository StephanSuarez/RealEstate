import { Router } from "express";
import { getProperties } from "../controller/apiController.js"

const router = Router();

router.get('/properties', getProperties);

export default router;
