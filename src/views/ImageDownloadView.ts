import { question } from "readline-sync";
import { View } from "./view.js";
import { clearView, enterToContinue, horizontalLine, showCenteredText, showText } from "./viewUtils.js";
import ims from 'image-to-ascii'
import got from "got";

export class ImageDownloadView extends View {  
    public viewName = "Fazer download de imagem";
    public async show(): Promise<void> {
        clearView();
        this.showHeader();

        return new Promise(async (resolve) => {
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
            if (!desiredUrl.endsWith(".jpg") && !desiredUrl.endsWith(".png")) {
                console.log("URL inválida. A URL deve terminar com .jpg ou .png");
                return resolve();
            }

            // // Fazer download da imagem
            await downloadImage(desiredUrl);

            // Mostrar imagem usando image-to-ascii
            clearView();
            horizontalLine();
            showCenteredText("Imagem convertida para ASCII")
            horizontalLine();

            // ImageToAscii("./Downloaded Images/" + "image.png", (err: any, converted: any) => {
            //     console.log(err || converted);
            // })

            this.removeMeFromStack();
            resolve();
        });
        
    }
}

import fs from "fs";
import { Stack } from "../utils/stack.js";
import { getColor, setColor } from "../main.js";
async function downloadImage(desiredUrl: string) : Promise<void> {
    const response = await got(desiredUrl, { responseType: "buffer" });
    
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
}
