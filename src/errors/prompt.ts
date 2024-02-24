export class ClassificationFailedError extends Error {
    status: number;

    constructor() {
        super("I don't understand. Maybe ask me to tell you a story instead?");
        this.name = "ClassificationFailedError";
        this.status = 400;
    }
}

export class PromptRejectedError extends Error {
    status: number;

    constructor() {
        const randomAnimal = "dolphin";
        super(`I don't want to talk about that. Try asking me to tell you a story about a ${randomAnimal}!`);
        this.name = "PromptRejectedError";
        this.status = 400;
    }
}
