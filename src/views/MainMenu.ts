import { cursorTo } from "readline";
import { clearView, showCenteredText, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { GetMethodView } from "./GetMethodView.js";
import { FarewellView } from "./FarewellView.js";
import { Stack } from "../utils/stack.js";
import { View } from "./view.js";
import { ImageDownloadView } from "./ImageDownloadView.js";
import { getNumberInput } from "../utils/input.js";
import { ImagesListView } from "./ImagesListView.js";
import { ParseLinksView } from "./ParseLinksView.js";

export class MainMenu extends View {
    viewName = "Menu Principal";

    public async show(): Promise<void> {
        clearView();
        this.showHeader();
        showText("1 - Requisição GET");
        showText("2 - Fazer download de imagem");
        showText("3 - Mostrar links de página");
        showText("4 - Pesquisar palavras na página");
        showText("5 - Exibir imagens baixadas.");
        showText("0 - Sair");

        let option = -1;
        while (option < 0 || option > 5) {
            option = getNumberInput();
            process.stdout.moveCursor(0, -1);
        }

        switch (option) {
            case 1:
                this.viewStack.push(new GetMethodView());
                break;
            case 2:
                this.viewStack.push(new ImageDownloadView());
                break;
            case 3:
                this.viewStack.push(new ParseLinksView());
                break;
            case 4:
                console.log("Pesquisar palavras na página");
                break;
            case 5:
                console.log("Exibir imagens baixadas.");
                this.viewStack.push(new ImagesListView());
                break;
            case 0:
                console.log()
                this.viewStack.push(new FarewellView());
                break;
        }
    }
}