import { got, Response } from 'got';
import { question } from 'readline-sync';
import { cursorTo } from 'readline';
import {
    clearTerminal,
    clearView,
    showText,
    horizontalLine,
    showCenteredText,
    enterToContinue,
    getRows,
    introText
} from './utils/viewUtils.js';
import { App } from "./app.js";

let actualColorHex = "#FFFFFF";

export function setColor(color: string) {
    actualColorHex = color;
}

export function getColor() : string {
    return actualColorHex;
}

async function testGot(testURL: string) {
    let desiredURL: string = testURL;
    if (!desiredURL) {
        desiredURL = 'https://jsonplaceholder.typicode.com/posts/1'
        console.log(`URL não informada. Utilizando URL padrão: \n${desiredURL}`);
    }

    try {
        const response: Response = await got(desiredURL);
        horizontalLine();
        showCenteredText('Resposta da Requisição');
        showCenteredText(response.url);
        showCenteredText(`Status: ${response.statusCode} - ${response.statusMessage} | Tempo: ${response.timings.phases.total} ms | Tamanho: ${response.rawBody.length} bytes`);
        showCenteredText(`Cabeçalhos:`);
        console.log(response.headers);
        showCenteredText('Corpo da Resposta:');
        console.log(response.body);
        horizontalLine();
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}


function main() {
    const app = new App();
    app.run();
}

main();