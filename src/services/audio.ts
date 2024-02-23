import { openai } from "../helpers/openai";

export const transcribe = async (file: File): Promise<string> => {
  const res = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file,
  });

  return res.text;
};
