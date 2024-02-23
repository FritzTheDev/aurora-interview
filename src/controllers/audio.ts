import { fileFromPath } from "openai";
import { Request, Response } from "express";

import { transcribe } from "../services/audio";

export const handleTranscriptionRequest = async (
  _req: Request,
  res: Response
) => {
  const file = await fileFromPath("./resources/sarah.mp3");
  const transcription = await transcribe(file);
  return res.status(200).send(transcription);
};

export const handleTranscriptClassification = async (
  _req: Request,
  res: Response
) => {
  // Transcribe the audio
  const file = await fileFromPath("./resources/sarah.mp3");
  const transcription = await transcribe(file);

  // Classify the transcription

  return res.status(200).send(transcription);
};
