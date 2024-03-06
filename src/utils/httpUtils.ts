import { got, Response } from "got";
import { clearView, enterToContinue, getColumns, horizontalLine, showCenteredText, showMiniHeader, showText } from "../views/viewUtils.js";
import { IncomingHttpHeaders } from "http";
import chalk from "chalk";

export async function testGot(testURL: string) {
    let desiredURL: string = testURL;
    if (!desiredURL) {

        // Gerar URL aleatória
        const _randomType = Math.random() > 0.5 ? 'people/' : 'planets/';
        const _randomNumber = Math.floor(Math.random() * 10) + 1;
        desiredURL = 'https://swapi.dev/api/' + _randomType + _randomNumber

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
        const response: Response = await got(desiredURL);
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
    } catch (error: any) {
        console.error('Error:', error.message);
        enterToContinue();
    }
}

function showResponseHeaders(headers: IncomingHttpHeaders) {
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
                if (i < valuePiecesNumber - 1) console.log();
            }
        }
    }
}

function showResponseBody(response: Response) {
    // Checar se a response é json
    let isJson = (response.headers["content-type"] === 'application/json');
    // Se for json, exibir o json formatado
    if (isJson) {
        try {
            const json = JSON.parse(String(response.rawBody));
            showText(JSON.stringify(json, null, 2));
        } catch (error: any) {
            showText('Error:', error.message);
        }
    } else {
        // Se não for json, exibir o texto normalmente
        showText(String(response.rawBody));
    }
}
