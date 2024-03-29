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
import { clearView, enterToContinue, showText, showTextInColumns } from "./viewUtils.js";
import { question } from "readline-sync";
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
            showText("Selecione a imagem que você quer visualizar: ");
            // Obter arquivos de imagem da pasta:
            let imagesObjectsArray = fs.readdirSync("./Downloaded Images", { withFileTypes: true });
            // Filtrar apenas arquivos de imagem
            imagesObjectsArray = imagesObjectsArray.filter((file) => {
                return file.isFile() && file.name.match(/\.(jpg|jpeg|png)$/i);
            });
            // Cada elemento do array passará a ser o nome do arquivo.
            let imagesNamesArray = imagesObjectsArray.map((file, index) => {
                return `${file.name}`;
            });
            // Mostrar os nomes dos arquivos
            showTextInColumns(imagesNamesArray);
            // Perguntar ao usuário qual imagem ele quer visualizar
            console.log();
            showText("Insira o nome ou índice da imagem desejada: ");
            process.stdout.moveCursor(0, -1);
            let desiredImage = question("");
            while (desiredImage === "") {
                process.stdout.moveCursor(0, -1);
                desiredImage = question("");
            }
            // Verificar se o usuário digitou um número
            let index = parseInt(desiredImage);
            if (isNaN(index)) {
                // Se não for um número, verificar se é o nome de um arquivo
                if (!imagesNamesArray.includes(desiredImage)) {
                    console.log("Nome de arquivo inválido.");
                    enterToContinue();
                    this.removeMeFromStack();
                    return;
                }
            }
            else {
                // Se for um número, verificar se o número é um índice válido
                if (index < 0 || index >= imagesNamesArray.length) {
                    console.log("Índice inválido.");
                    enterToContinue();
                    this.removeMeFromStack();
                    return;
                }
                desiredImage = imagesNamesArray[index];
            }
            // Ir para tela de exibição de imagem
            // this.imageTest = fs.readFileSync("./Downloaded Images/mario.jpg");
            // // Checar se a imagem existe
            // if (!this.imageTest) {
            //     console.log("Imagem não encontrada.");
            //     enterToContinue();
            //     this.removeMeFromStack();
            //     return;
            // }
            // try {
            //     const converted = await new Promise((resolve, reject) => {
            //     ims(this.imageTest, {
            //         colored: true,
            //         size: {
            //             width: 24,
            //             height: 12
            //         }
            //     }, (err: any, converted: any) => {
            //         if (err) reject(err);
            //         resolve(converted);
            //     });
            //     });
            //     console.log(converted);
            // } catch (err) {
            //     console.error("Erro ao converter a imagem para ASCII: ", err);
            // }
            enterToContinue();
            this.removeMeFromStack();
        });
    }
}
