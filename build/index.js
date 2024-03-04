var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { got } from 'got';
import { horizontalLine, showCenteredText } from './utils/viewUtils.js';
import { App } from "./app.js";
let actualColorHex = "#FFFFFF";
export function setColor(color) {
    actualColorHex = color;
}
export function getColor() {
    return actualColorHex;
}
function testGot(testURL) {
    return __awaiter(this, void 0, void 0, function* () {
        let desiredURL = testURL;
        if (!desiredURL) {
            desiredURL = 'https://jsonplaceholder.typicode.com/posts/1';
            console.log(`URL não informada. Utilizando URL padrão: \n${desiredURL}`);
        }
        try {
            const response = yield got(desiredURL);
            horizontalLine();
            showCenteredText('Resposta da Requisição');
            showCenteredText(response.url);
            showCenteredText(`Status: ${response.statusCode} - ${response.statusMessage} | Tempo: ${response.timings.phases.total} ms | Tamanho: ${response.rawBody.length} bytes`);
            showCenteredText(`Cabeçalhos:`);
            console.log(response.headers);
            showCenteredText('Corpo da Resposta:');
            console.log(response.body);
            horizontalLine();
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    });
}
function main() {
    const app = new App();
    app.run();
}
main();
