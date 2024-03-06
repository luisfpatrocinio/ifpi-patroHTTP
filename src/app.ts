import { Stack } from "./utils/stack.js";
import { IntroView } from "./views/IntroView.js";
import { MainMenu } from "./views/MainMenu.js";
import { View } from "./views/view.js";
import { clearTerminal, enterToContinue } from "./views/viewUtils.js";

export class App {
    // Stack de funções
    private viewStack: Stack<View> = new Stack<View>();
    
    constructor() {
        this.viewStack.push(new IntroView());
    }

    // Iniciar aplicação
    public async run(): Promise<void> {
        // Execução normal da aplicação.
        while (!this.viewStack.isEmpty()) {
            const view = this.viewStack.peek();
            view.viewStack = this.viewStack;
            await view.show();
        }

        // Limpar terminal
        clearTerminal();
        console.log("Fim da aplicação.");
    }
}