import { Stack } from "./utils/stack.js";
import { IntroView, MenuView, View } from "./utils/view.js";
import { clearTerminal, introText } from "./utils/viewUtils.js";

export class App {
    // Stack de funções
    private viewStack: Stack<View> = new Stack<View>();

    // Iniciar aplicação
    public run(): void {
        this.viewStack.push(new MenuView());
        this.viewStack.push(new IntroView());
        while (!this.viewStack.isEmpty()) {
            const view = this.viewStack.peek();
            view.show();
        }

        // console.log("Fim da aplicação.");
    }
}