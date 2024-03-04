import { got, Response } from "got";
import { clearView, enterToContinue, horizontalLine, showCenteredText, showHeader, showText } from "./viewUtils.js";

export async function testGot(testURL: string) {
    let desiredURL: string = testURL;
    if (!desiredURL) {
        desiredURL = 'https://jsonplaceholder.typicode.com/posts/1'
        showText(`URL não informada. Utilizando URL padrão:`);
        showText(`${desiredURL}`);
        enterToContinue();
    }

    try {
        showText("Realizando requisição...");
        const response: Response = await got(desiredURL);
        showText("Requisição realizada com sucesso.");
        enterToContinue();
        clearView();
        console.log();
        horizontalLine();
        showCenteredText('Resposta da Requisição');
        showCenteredText(response.url);
        showCenteredText(`Status: ${response.statusCode} - ${response.statusMessage} | Tempo: ${response.timings.phases.total} ms | Tamanho: ${response.rawBody.length} bytes`);
        showHeader(`Cabeçalhos:`);
        console.log(response.headers);
        showHeader('Corpo da Resposta:');
        console.log(response.body);
        horizontalLine();
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}
