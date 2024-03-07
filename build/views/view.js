var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Stack } from "../utils/stack.js";
import { horizontalLine, showCenteredText } from "./viewUtils.js";
export class View {
    constructor() {
        this.viewStack = new Stack();
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Método não implementado.");
        });
    }
    removeTopFromStack() {
        this.viewStack.pop();
    }
    showHeader() {
        horizontalLine();
        showCenteredText(this.viewName);
        showCenteredText("Tamanho da ViewStack: " + String(this.viewStack.size()));
        horizontalLine();
    }
}
