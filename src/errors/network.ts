export class NetworkError extends Error {
    status: number;

    constructor() {
        super("I'm feeling pretty tired. Let's play later!");
        this.name = "NetworkError";
        this.status = 503;
    }
}
