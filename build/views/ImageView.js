var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import ims from 'image-to-ascii';
import { View } from "./view.js";
import { clearView, enterToContinue, getColumns } from "./viewUtils.js";
export class ImageView extends View {
    constructor(image) {
        super();
        this.image = image;
        this.viewName = "Exibição de Imagem";
        this.imageToShow = image;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            this.showHeader();
            const image = fs.readFileSync("./Downloaded Images/" + this.imageToShow);
            // Checar se a imagem existe
            if (!image) {
                console.log("Imagem não encontrada.");
                enterToContinue();
                this.removeTopFromStack();
                return;
            }
            try {
                const converted = yield new Promise((resolve, reject) => {
                    ims(image, {
                        colored: true,
                        size: {
                            width: getColumns() / 2
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
            this.removeTopFromStack();
        });
    }
}
