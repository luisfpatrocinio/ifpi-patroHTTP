var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Stack } from "./utils/stack.js";
import { IntroView, MainMenu } from "./utils/view.js";
import { clearTerminal } from "./utils/viewUtils.js";
export class App {
    constructor() {
        // Stack de funções
        this.viewStack = new Stack();
    }
    // Iniciar aplicação
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.viewStack.push(new MainMenu());
            this.viewStack.push(new IntroView());
            // Execução normal da aplicação.
            while (!this.viewStack.isEmpty()) {
                const view = this.viewStack.peek();
                yield view.show();
                this.viewStack.pop();
            }
            // Limpar terminal
            clearTerminal();
            console.log("Fim da aplicação.");
        });
    }
}
