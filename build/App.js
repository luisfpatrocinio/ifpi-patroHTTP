import { Stack } from "./utils/stack.js";
import { IntroView, MenuView } from "./utils/view.js";
export class App {
    constructor() {
        // Stack de funções
        this.viewStack = new Stack();
    }
    // Iniciar aplicação
    run() {
        this.viewStack.push(new MenuView());
        this.viewStack.push(new IntroView());
        while (!this.viewStack.isEmpty()) {
            const view = this.viewStack.peek();
            view.show();
        }
        // console.log("Fim da aplicação.");
    }
}
