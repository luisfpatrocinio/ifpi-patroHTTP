import fs from "fs";
import ims from 'image-to-ascii'
import { View } from "./view.js";
import { clearView, enterToContinue, getColumns } from "./viewUtils.js";

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
                    width: getColumns() / 2
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
        this.removeTopFromStack();
    }
}