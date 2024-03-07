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
import { ImageView } from "./ImageView.js";
export class ImagesListView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Seleção de Imagem";
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
            let label = "Insira o nome ou índice da imagem desejada: ";
            showText(label);
            process.stdout.moveCursor(label.length + 1, -1);
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
                    this.removeTopFromStack();
                    return;
                }
            }
            else {
                // Se for um número, verificar se o número é um índice válido
                if (index < 0 || index >= imagesNamesArray.length) {
                    console.log("Índice inválido.");
                    enterToContinue();
                    this.removeTopFromStack();
                    return;
                }
                desiredImage = imagesNamesArray[index];
            }
            showText("Imagem selecionada: " + desiredImage);
            enterToContinue();
            this.removeTopFromStack();
            // Ir para tela de exibição de imagem
            this.viewStack.push(new ImageView(desiredImage));
            return;
        });
    }
}
