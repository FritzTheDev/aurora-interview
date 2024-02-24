import { openai } from "../helpers/openai";
import { requestClasses } from "../config/classifications";
import { NetworkError } from "../errors/network";
import { ClassificationFailedError, PromptRejectedError } from "../errors/prompt";

/**
 * Classifies the given transcript using the OpenAI Chat Completions API.
 * @param transcript The transcript to classify.
 */
export async function routePrompt(prompt: string) {
    let classification: string;

    //   Attempt an API request to classify the prompt
    try {
        classification = await classify(prompt);
    } catch (error) {
        // notifyParent("I'm having some technical difficulties. I might not work as expected. $BRAND is working on it!")
        throw new NetworkError();
    }

    if (classification === "REJECT") {
        // notifyParent("I was just asked a question I'm not allowed to answer. You can find the details in my chat logs.")
        throw new PromptRejectedError();
    }

    if (classification === "MODERATE") {
        // notifyParent("I was just asked a question you might find inappropriate. You can find the details in my chat logs.")
        throw new PromptRejectedError();
    }

    if (requestClasses.includes(classification)) {
        return classification;
    }

    // notifyParent("I was just asked a question I'm not allowed to answer. You can find it in my chat logs.")
    throw new ClassificationFailedError();
}

async function classify(prompt: string) {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `
Classify a user prompt into one of the following categories: ${requestClasses.join(", ")}

If you aren't allowed to fulfill the prompt, reply with "REJECT".
If the prompt relates to something inappropriate for a young child, reply "MODERATE",
If the prompt isn't in the listed classes, reply with "OTHER".
It is critical that you reply exclusively with either the exact name of a supplied category, "MODERATE", "OTHER", or "REJECT". DO NOT include anything else.`,
            },
            {
                role: "user",
                content: "Prompt: " + prompt,
            },
        ],
    });
    return res.choices[0].message.content as string;
}
