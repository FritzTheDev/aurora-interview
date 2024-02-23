import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY as string; // validated in index.ts
const client = new OpenAI({ apiKey });

/**
 *
 * @param file
 * @returns Promise()
 */
export const transcribe = async (file: File): Promise<string> => {
  const res = await client.audio.transcriptions.create({
    model: "whisper-1",
    file,
    response_format: "text",
  });

  return res.text;
};
