var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { question } from "readline-sync";
import { View } from "./view.js";
import { clearView, enterToContinue, horizontalLine, showCenteredText, showText } from "./viewUtils.js";
import got from "got";
export class ImageDownloadView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Fazer download de imagem";
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            this.showHeader();
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                // Perguntar URL da imagem.
                showText("Digite a URL da imagem que deseja fazer download: ");
                showText("URL: ");
                process.stdout.moveCursor(6, -1);
                let desiredUrl = question();
                // Checar url vazia
                if (desiredUrl === "") {
                    let color = getColor();
                    setColor("#FF####");
                    showText("URL inválida. A URL não pode ser vazia.");
                    setColor(color);
                    desiredUrl = "https://www.w3.org/Graphics/PNG/nurbcup2si.png";
                    showText("Utilizando URL de teste: " + desiredUrl);
                }
                // Checar se começa com http
                if (!desiredUrl.startsWith("http")) {
                    desiredUrl = "http://" + desiredUrl;
                }
                // Checar se termina com .jpg ou .png
                // if (!desiredUrl.endsWith(".jpg") && !desiredUrl.endsWith(".png")) {
                //     console.log("URL inválida. A URL deve terminar com .jpg ou .png");
                //     return resolve();
                // }
                // // Fazer download da imagem
                yield downloadImage(desiredUrl);
                // Mostrar imagem usando image-to-ascii
                clearView();
                horizontalLine();
                showCenteredText("Imagem convertida para ASCII");
                horizontalLine();
                // ImageToAscii("./Downloaded Images/" + "image.png", (err: any, converted: any) => {
                //     console.log(err || converted);
                // })
                this.removeTopFromStack();
                resolve();
            }));
        });
    }
}
import fs from "fs";
import { getColor, setColor } from "../main.js";
function downloadImage(desiredUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield got(desiredUrl, { responseType: "buffer" });
        // Perguntar nome do arquivo:
        showText("Digite o nome do arquivo que deseja salvar: ");
        showText("Nome: ");
        process.stdout.moveCursor(7, -1);
        let _fileName = question();
        // Checar se termina com .jpg ou .png
        if (!_fileName.endsWith(".jpg") && !_fileName.endsWith(".png")) {
            // Adicionar .png
            _fileName += ".png";
        }
        fs.writeFileSync("./Downloaded Images/" + _fileName, response.body);
        showText("Imagem salva com sucesso!");
        enterToContinue();
        return new Promise((resolve) => {
            resolve();
        });
    });
}
