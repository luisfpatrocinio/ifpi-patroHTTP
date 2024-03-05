import { Stack } from "./utils/stack.js";
import { GetMethodView, IntroView, MainMenu, View } from "./utils/view.js";
import { clearTerminal } from "./utils/viewUtils.js";

export class App {
    // Stack de funções
    private viewStack: Stack<View> = new Stack<View>();

    // Iniciar aplicação
    public async run(): Promise<void> {
        this.viewStack.push(new MainMenu(this.viewStack));
        this.viewStack.push(new IntroView());

        // Execução normal da aplicação.
        while (!this.viewStack.isEmpty()) {
            const view = this.viewStack.pop();
            await view.show();
        }

        // Limpar terminal
        clearTerminal();

        console.log("Fim da aplicação.");
    }
}