import { cursorTo } from "readline";
import { View } from "./view.js";
import { clearView, enterToContinue, horizontalLine, showCenteredText, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { testGot } from "../utils/httpUtils.js";

export class GetMethodView extends View {
    public viewName = "Requisição GET";
    private canSkip: boolean = false;

    public async show(): Promise<void> {
        clearView();
        console.log();
        this.showHeader()

        return new Promise(async (resolve) => {
            showText("Insira a URL que deseja consultar.");
            console.log();
            
            showText("URL: ");
            cursorTo(process.stdout, 6);
            process.stdout.moveCursor(0, -1);
            const url = question("");
            console.log();

            await testGot(url);

            enterToContinue();
            this.removeMeFromStack();
            resolve();
        });
    }
}