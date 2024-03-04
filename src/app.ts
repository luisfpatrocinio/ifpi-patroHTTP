import { Stack } from "./utils/stack.js";
import { GetMethodView, IntroView, View } from "./utils/view.js";
import { clearTerminal } from "./utils/viewUtils.js";

export class App {
    // Stack de funções
    private viewStack: Stack<View> = new Stack<View>();

    // Iniciar aplicação
    public async run(): Promise<void> {
        this.viewStack.push(new GetMethodView());
        this.viewStack.push(new IntroView());

        // Execução normal da aplicação.
        while (!this.viewStack.isEmpty()) {
            const view = this.viewStack.peek();
            await view.show();
            this.viewStack.pop();
        }

        // Limpar terminal
        clearTerminal();

        console.log("Fim da aplicação.");
    }
}