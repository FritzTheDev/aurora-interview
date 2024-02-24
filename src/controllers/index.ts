import { fileFromPath } from "openai";
import { Request, Response } from "express";

import { transcribe } from "../services/audio";
import { routePrompt } from "../logic/classifiers";
import { NetworkError } from "../errors/network";
import { PromptRejectedError, ClassificationFailedError } from "../errors/prompt";

const errorClasses = [NetworkError, PromptRejectedError, ClassificationFailedError];

export const handleTranscriptionRequest = async (_req: Request, res: Response) => {
    const file = await fileFromPath("./resources/sarah.mp3");
    const transcription = await transcribe(file);
    return res.status(200).send(transcription);
};

export const handleTranscriptClassification = async (_req: Request, res: Response) => {
    // Transcribe the audio
    const file = await fileFromPath("./resources/fritz.mp3");
    const transcription = await transcribe(file);

    // Classify the transcription
    try {
        const route = await routePrompt(transcription);
        return res.status(200).send(route);
    } catch (error) {
        for (const errorClass of errorClasses) {
            if (error instanceof errorClass) {
                return res.status(error.status).send(error.message);
            }
        }
    }
};
