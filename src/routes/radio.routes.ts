import { Router } from "express";
import RadioController from "../controllers/radio.controller";

const router = Router();

router.get("/radio", RadioController.playRadio);

export default router;
