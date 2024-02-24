import { Router } from "express";
import { handleTranscriptClassification, handleTranscriptionRequest } from "./controllers";

export const router = Router();

router.get("/stt", handleTranscriptionRequest);
router.get("/classify", handleTranscriptClassification);
