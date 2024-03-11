import { AppError } from "./AppError.js";

export class HttpError extends AppError {
    constructor(message: string = "Erro de HTTP") {
        super(message);
        this.name = "HttpError";
    }
}