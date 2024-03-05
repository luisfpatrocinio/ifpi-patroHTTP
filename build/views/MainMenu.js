var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { clearView, showHeader, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { GetMethodView } from "./GetMethodView.js";
import { FarewellView } from "./FarewellView.js";
export class MainMenu {
    constructor(viewStack) {
        // Captura a referência da Stack de Views
        this.viewStack = viewStack;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            showHeader("Menu Principal");
            showText("1 - Requisição GET");
            showText("2 - Fazer download de imagem");
            showText("3 - Mostrar links de página");
            showText("4 - Pesquisar palavras na página");
            showText("0 - Sair");
            let option = -1;
            while (option < 0 || option > 4) {
                showText("Opção: ", 1);
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
                    console.log("Requisição GET");
                    this.viewStack.push(new GetMethodView());
                    break;
                case 2:
                    console.log("Fazer download de imagem");
                    break;
                case 3:
                    console.log("Mostrar links de página");
                    break;
                case 4:
                    console.log("Pesquisar palavras na página");
                    break;
                case 0:
                    console.log();
                    this.viewStack.push(new FarewellView());
                    break;
            }
        });
    }
}
