var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import got from "got";
import cheerio from "cheerio";
import { getTextInput } from "../utils/input.js";
import { View } from "./view.js";
import { DEFAULT_COLOR, clearView, enterToContinue, showText } from "./viewUtils.js";
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
    constructor() {
        super(...arguments);
        this.viewName = "Mostrar links de página";
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            this.showHeader();
            // Perguntar URL
            let desiredUrl = getTextInput("Digite a URL: ");
            // Lógica de Parse
            const response = yield got(desiredUrl);
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
        });
    }
}
