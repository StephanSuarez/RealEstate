import { Router } from "express";
import identifyUser from "../../middleware/identifyUser.js";
import findCategories from "../../middleware/findCategories.js";
import { home, category, notFound, searchEngine } from "../controller/appController.js"

const router = Router();

router.get('/', identifyUser, findCategories, home);

router.get('/category/:id', identifyUser, findCategories, category);

router.get('/404', identifyUser, findCategories, notFound);

router.get('/searchEngine', identifyUser, findCategories, searchEngine);

export default router;