import { View } from "./view.js";
import { clearTerminal, clearView, showCenteredText } from "./viewUtils.js";

export class FarewellView extends View {
    public viewName = "Fim";
    canSkip: boolean = false;
    
    public async show(): Promise<void> {
        clearView();
        for (let i = 0; i < 6; i++) {
            console.log();
        }
        showCenteredText("Fim.");

        setTimeout( ()=> {
            this.canSkip = true;
        }, 500);

        return new Promise((resolve) => {
            if (this.canSkip) {
                clearTerminal();
                resolve();
            }
        });
    }
}