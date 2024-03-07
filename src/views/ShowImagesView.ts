import { View } from "./view.js";
import fs from "fs";
import ims from 'image-to-ascii'
import { clearView, enterToContinue, getColumns, getRows } from "./viewUtils.js";

export class ShowImagesView extends View {
    public viewName: string = "Exibição de Imagem";
    public imageTest = fs.readFileSync("./Downloaded Images/mario.jpg");

    public async show(): Promise<void> {
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
            const converted = await new Promise((resolve, reject) => {
            ims(this.imageTest, {
                colored: true,
                size: {
                    width: 24,
                    height: 12
                }
            }, (err: any, converted: any) => {
                if (err) reject(err);
                resolve(converted);
            });
            });
            console.log(converted);
        } catch (err) {
            console.error("Erro ao converter a imagem para ASCII: ", err);
        }

        enterToContinue();
        this.removeMeFromStack();
    }
}