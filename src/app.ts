import { Stack } from "./utils/stack.js";
import { IntroView } from "./views/IntroView.js";
import { MainMenu } from "./views/MainMenu.js";
import { ImagesListView } from "./views/ImagesListView.js";
import { View } from "./views/view.js";
import { clearTerminal, enterToContinue, showError } from "./views/viewUtils.js";

export class App {
    // Stack de funções
    private viewStack: Stack<View> = new Stack<View>();
    
    constructor() {
        // this.viewStack.push(new IntroView());
        this.viewStack.push(new IntroView());
    }

    // Iniciar aplicação
    public async run(): Promise<void> {
        // Execução normal da aplicação.
        while (!this.viewStack.isEmpty()) {
            const view = this.viewStack.peek();
            view.viewStack = this.viewStack;
            try {
                await view.show();
            } catch (error: any) {
                showError(error);
                enterToContinue();
                this.viewStack.pop();
            }
        }

        // Limpar terminal
        clearTerminal();
        console.log("Fim da aplicação.");
    }
}