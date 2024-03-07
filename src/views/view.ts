import { Stack } from "../utils/stack.js";
import { enterToContinue, horizontalLine, showCenteredText } from "./viewUtils.js";

export abstract class View {
    public abstract viewName: string;
    
    public viewStack: Stack<View> = new Stack<View>();
    public async show(): Promise<void> {
        throw new Error("Método não implementado.");
    }

    public removeTopFromStack(): void {
        this.viewStack.pop();
    }

    public showHeader() : void {
        horizontalLine();
        showCenteredText(this.viewName);
        showCenteredText("Tamanho da ViewStack: " + String(this.viewStack.size()));
        horizontalLine();
    }
}