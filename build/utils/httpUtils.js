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
import { clearView, enterToContinue, horizontalLine, showCenteredText, showHeader, showText } from "./viewUtils.js";
export function testGot(testURL) {
    return __awaiter(this, void 0, void 0, function* () {
        let desiredURL = testURL;
        if (!desiredURL) {
            desiredURL = 'https://jsonplaceholder.typicode.com/posts/1';
            showText(`URL não informada. Utilizando URL padrão:`);
            showText(`${desiredURL}`);
            enterToContinue();
        }
        try {
            showText("Realizando requisição...");
            const response = yield got(desiredURL);
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
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    });
}
