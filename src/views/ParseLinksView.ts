import got from "got";
import cheerio from "cheerio";
import { getTextInput } from "../utils/input.js";
import { View } from "./view.js";
import { DEFAULT_COLOR, clearView, enterToContinue, showCenteredText, showText } from "./viewUtils.js";
import { setColor } from "../main.js";

/*

Crie uma aplicação que receba uma URL de uma página WEB como entrada e
execute uma chamada usando o método GET para a URL e efetue um "parse"
na página obtida e exibindo todos os links presentes na página: atributos href
contidos dentro de tags <a></a>
Ex de link: <a href="http://www.google.com">Página do Google</a>
Dica: use expressões regulares ou o equivalente ao beautiful soap

*/

export class ParseLinksView extends View {
    viewName = "Mostrar links de página";

    public async show(): Promise<void> {
        clearView();
        this.showHeader();

        // Perguntar URL
        let desiredUrl = getTextInput("Digite a URL: ");
        
        // Lógica de Parse
        const response = await got(desiredUrl);
        const html = response.body; 

        setColor("#FFFF99");
        const $ = cheerio.load(html);
        $('a').each((index, element) => {
            const link = $(element).attr('href');
            showText(`> ${link}`);
        });
        setColor(DEFAULT_COLOR);


        enterToContinue();

        this.removeTopFromStack();
    }
}