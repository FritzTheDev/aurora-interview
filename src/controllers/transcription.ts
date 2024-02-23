import { fileFromPath } from "openai";
import { Request, Response } from "express";

import { transcribe } from "../services/openai";

/**
 * Handles a transcription request.
 */
export const handleTranscriptionRequest = async (
  _req: Request,
  res: Response
) => {
  const file = await fileFromPath("./resources/adam.mp3");
  const transcription = await transcribe(file);

  return res.status(200).send(transcription);
};
