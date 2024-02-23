import { Router } from "express";
import { handleTranscriptionRequest } from "./controllers/audio";

export const router = Router();

router.get("/stt", handleTranscriptionRequest);
