import { Router } from "express";
import {
  handleTranscriptClassification,
  handleTranscriptionRequest,
} from "./controllers/audio";

export const router = Router();

router.get("/stt", handleTranscriptionRequest);
router.get("/classify", handleTranscriptClassification);
