import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY as string; // validated in index.ts
export const openai = new OpenAI({ apiKey });
