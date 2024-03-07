import fs from "fs";
import ims from 'image-to-ascii'
import { View } from "./view.js";
import { clearView, enterToContinue, getColumns, getRows, showText } from "./viewUtils.js";
import chalk from "chalk";

export class ImageView extends View {
    public viewName: string = "Exibição de Imagem";
    public imageToShow: string;

    constructor(public image: string) {
        super();
        this.imageToShow = image;
    }  

    public async show(): Promise<void> {
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
            const converted = await new Promise((resolve, reject) => {
            ims(image, {
                colored: true,
                size: {
                    height: getRows() - 8
                }
            }, (err: any, converted: any) => {
                if (err) reject(err);
                resolve(converted);
            });
            });
            drawImageString(converted);
        } catch (err) {
            console.error("Erro ao converter a imagem para ASCII: ", err);
        }

        enterToContinue();
        this.removeTopFromStack();
    }
}

function drawImageString(imageString: string | unknown) {
    // Desenhar linha por linha
    if (typeof imageString !== "string") {
        showText("Erro ao converter a imagem para ASCII.");
        return;
    }
    const lines = imageString.split("\n");
    lines.forEach((line) => {
        let pos = Math.floor((getColumns() - lines.length) / 2);
        // let spacesString = " ".repeat(pos);
        showText(chalk.bgHex("#000000")(line), pos)
    });
}