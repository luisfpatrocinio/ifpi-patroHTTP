var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { clearView, showText } from "./viewUtils.js";
import { GetMethodView } from "./GetMethodView.js";
import { FarewellView } from "./FarewellView.js";
import { View } from "./view.js";
import { ImageDownloadView } from "./ImageDownloadView.js";
import { getNumberInput } from "../utils/input.js";
export class MainMenu extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Menu Principal";
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            this.showHeader();
            showText("1 - Requisição GET");
            showText("2 - Fazer download de imagem");
            showText("3 - Mostrar links de página");
            showText("4 - Pesquisar palavras na página");
            showText("0 - Sair");
            let option = -1;
            while (option < 0 || option > 4) {
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
