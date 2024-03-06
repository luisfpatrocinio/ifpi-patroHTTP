import { cursorTo } from "readline";
import { clearView, showCenteredText, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { GetMethodView } from "./GetMethodView.js";
import { FarewellView } from "./FarewellView.js";
import { Stack } from "../utils/stack.js";
import { View } from "./view.js";
import { ImageDownloadView } from "./ImageDownloadView.js";

export class MainMenu extends View {
    viewName = "Menu Principal";

    public async show(): Promise<void> {
        clearView();
        this.showHeader();
        showText("1 - Requisição GET");
        showText("2 - Fazer download de imagem");
        showText("3 - Mostrar links de página");
        showText("4 - Pesquisar palavras na página");
        showText("0 - Sair");

        let option = -1;
        while (option < 0 || option > 4) {
            showText("Opção: ", 1)
            process.stdout.moveCursor(9, -1);
            let input = "";
            while (input === "") {
                input = question("");
                process.stdout.moveCursor(9, -1);
            }
            option = Number(input);
            console.log();
        }

        switch (option) {
            case 1:
                console.log("Requisição GET")
                this.viewStack.push(new GetMethodView());
                break;
            case 2:
                console.log("Fazer download de imagem");
                this.viewStack.push(new ImageDownloadView());
                break;
            case 3:
                console.log("Mostrar links de página");
                break;
            case 4:
                console.log("Pesquisar palavras na página");
                break;
            case 0:
                console.log()
                this.viewStack.push(new FarewellView());
                break;
        }
    }
}