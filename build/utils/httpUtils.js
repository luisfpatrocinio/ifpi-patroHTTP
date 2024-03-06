var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { got } from "got";
import { clearView, enterToContinue, getColumns, horizontalLine, showCenteredText, showMiniHeader, showText } from "../views/viewUtils.js";
import chalk from "chalk";
export function testGot(testURL) {
    return __awaiter(this, void 0, void 0, function* () {
        let desiredURL = testURL;
        if (!desiredURL) {
            // Gerar URL aleatória
            const _randomType = Math.random() > 0.5 ? 'people/' : 'planets/';
            const _randomNumber = Math.floor(Math.random() * 10) + 1;
            desiredURL = 'https://swapi.dev/api/' + _randomType + _randomNumber;
            showText(`URL não informada. Utilizando URL padrão:`);
            showText(`${desiredURL}`);
            enterToContinue();
        }
        try {
            // Realizar requisição:
            clearView();
            showMiniHeader("Requisição GET");
            showText("URL: " + desiredURL);
            showText("Realizando requisição...");
            const response = yield got(desiredURL);
            showText("Requisição realizada com sucesso.");
            enterToContinue();
            // Exibir Resposta
            clearView();
            console.log();
            horizontalLine();
            showCenteredText('Resposta da Requisição');
            showCenteredText(response.url);
            showCenteredText(`Status: ${response.statusCode} - ${response.statusMessage} | Tempo: ${response.timings.phases.total} ms | Tamanho: ${response.rawBody.length} bytes`);
            // Exibir Cabeçalhos
            showMiniHeader(`Cabeçalhos:`);
            showResponseHeaders(response.headers);
            // Exibir Corpo da Resposta
            showMiniHeader('Corpo da Resposta:');
            showResponseBody(response);
            horizontalLine();
        }
        catch (error) {
            console.error('Error:', error.message);
            enterToContinue();
        }
    });
}
function showResponseHeaders(headers) {
    for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
            const value = headers[key];
            // key: value
            showText(`> ${chalk.hex("#e82337")(key)}:`);
            // Quebrar o texto de value
            const spaceKey = key.length + 5;
            const spaceToShow = getColumns() - spaceKey - 2;
            // O texto do value precisa caber dentro de spaceToShow
            let valueStr = "";
            if (typeof value === 'string') {
                valueStr = value;
            }
            // Quebrar o texto em várias linhas
            const valuePiecesNumber = Math.ceil(valueStr.length / spaceToShow);
            for (let i = 0; i < valuePiecesNumber; i++) {
                const start = i * spaceToShow;
                const end = (i + 1) * spaceToShow;
                const piece = valueStr.substring(start, end);
                process.stdout.moveCursor(spaceKey, -1);
                showText(`${chalk.hex("#fff57a")(piece)}`, spaceKey);
                if (i < valuePiecesNumber - 1)
                    console.log();
            }
        }
    }
}
function showResponseBody(response) {
    // Checar se a response é json
    let isJson = (response.headers["content-type"] === 'application/json');
    // Se for json, exibir o json formatado
    if (isJson) {
        try {
            const json = JSON.parse(String(response.rawBody));
            showText(JSON.stringify(json, null, 2));
        }
        catch (error) {
            showText('Error:', error.message);
        }
    }
    else {
        // Se não for json, exibir o texto normalmente
        showText(String(response.rawBody));
    }
}
