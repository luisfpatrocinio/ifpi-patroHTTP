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
import chalk from "chalk";
/*

Crie uma aplicação que receba uma URL de uma página WEB como entrada e
uma palavra ou termo de pesquisa. Execute uma chamada usando o método
GET para a URL e efetue um "parse" na página obtida listando todas as
ocorrências da palavra na página. Para cada ocorrência, liste as 10 palavras
anteriores e as 10 posteriores, caso existam.

*/
export class SearchWordsView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Pesquisar palavras na página";
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            this.showHeader();
            // Perguntar URL
            let desiredUrl = getTextInput("Digite a URL: ");
            // Perguntar a palavra desejada
            let desiredWord = getTextInput("Digite a palavra desejada: ");
            // Faz a requisição GET para a URL
            const response = yield got(desiredUrl);
            // Pega o HTML da página
            const html = response.body;
            // Carrega o HTML no cheerio
            const $ = cheerio.load(html);
            // Extrai o texto do corpo da página
            const pageText = $('body').text();
            /// Procura a palavra desejada no texto da página
            // Cria uma expressão regular para encontrar a palavra desejada
            const wordRegex = new RegExp(`\\b(\\w+\\W+){0,10}${desiredWord}(\\W+\\w+){0,10}\\b`, 'gi');
            // Inicializa a variável que irá armazenar o resultado da busca
            let match;
            // Inicializa o array que irá armazenar os índices de cada ocorrência da palavra
            let matches = [];
            // Enquanto houver correspondências para a expressão regular no texto da página
            while ((match = wordRegex.exec(pageText)) !== null) {
                // Pega o texto da ocorrência
                let matchText = match[0];
                // Retirar quebras de linha e espaços em branco
                matchText = matchText.replace(/\s+/g, ' ');
                // Substitui a palavra desejada por ela mesma, mas com um fundo amarelo
                let re = new RegExp(desiredWord, 'gi');
                matchText = matchText.replace(re, chalk.bgYellowBright(desiredWord));
                // Adiciona a ocorrência ao array de ocorrências
                matches.push(matchText);
            }
            // Exibir mensagem de quantidade de ocorrências
            showText(`A palavra "${chalk.hex("#fff2c4")(desiredWord)}" foi encontrada ${matches.length} vezes na página.`);
            // Mostra as ocorrências da palavras
            matches.forEach((match) => {
                setColor("#FFFF99");
                showText(`> ${match}`);
            });
            setColor(DEFAULT_COLOR);
            enterToContinue();
            this.removeTopFromStack();
        });
    }
}
