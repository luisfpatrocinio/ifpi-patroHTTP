export class AppError extends Error {
    constructor(message = "Erro de Sistema") {
        super(message);
        this.name = "AppError";
    }
}
