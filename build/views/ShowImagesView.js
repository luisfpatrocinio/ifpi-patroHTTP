var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { View } from "./view.js";
import fs from "fs";
import ims from 'image-to-ascii';
import { clearView, enterToContinue } from "./viewUtils.js";
export class ShowImagesView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Exibição de Imagem";
        this.imageTest = fs.readFileSync("./Downloaded Images/mario.jpg");
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            // Visualizar imagem em ascii
            clearView();
            this.showHeader();
            this.imageTest = fs.readFileSync("./Downloaded Images/mario.jpg");
            // Checar se a imagem existe
            if (!this.imageTest) {
                console.log("Imagem não encontrada.");
                enterToContinue();
                this.removeMeFromStack();
                return;
            }
            try {
                const converted = yield new Promise((resolve, reject) => {
                    ims(this.imageTest, {
                        colored: true,
                        size: {
                            width: 24,
                            height: 12
                        }
                    }, (err, converted) => {
                        if (err)
                            reject(err);
                        resolve(converted);
                    });
                });
                console.log(converted);
            }
            catch (err) {
                console.error("Erro ao converter a imagem para ASCII: ", err);
            }
            enterToContinue();
            this.removeMeFromStack();
        });
    }
}
