import { Router } from "express";
import { handleTranscriptionRequest } from "./controllers/transcription";

export const router = Router();

router.get("/stt", handleTranscriptionRequest);
