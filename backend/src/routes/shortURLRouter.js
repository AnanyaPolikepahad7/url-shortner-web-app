import { Router } from "express";
import { createShortURL } from "../controllers/shortURLController.js";
import { privateRoute } from "../middlewares/authMiddleware.js";
import { getAndRedirectShortURL } from "../controllers/shortURLController.js";
const shortURLRouter = Router();

shortURLRouter.post("/",privateRoute,createShortURL);

shortURLRouter.get("/:shortCode",getAndRedirectShortURL);
export default shortURLRouter;
