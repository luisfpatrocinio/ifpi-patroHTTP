var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cursorTo } from "readline";
import { clearTerminal, clearView, enterToContinue, getColumns, getRows, horizontalLine, introText, showCenteredText, showHeader, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { testGot } from "./httpUtils.js";
export class FarewellView {
    constructor() {
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            for (let i = 0; i < 6; i++) {
                console.log();
            }
            showCenteredText("Fim.");
            setTimeout(() => {
                this.canSkip = true;
            }, 5000);
            return new Promise((resolve) => {
                if (this.canSkip) {
                    clearTerminal();
                    resolve();
                }
            });
        });
    }
}
export class MainMenu {
    constructor(viewStack) {
        // Captura a referência da Stack de Views
        this.viewStack = viewStack;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            showHeader("Menu Principal");
            showText("1 - Requisição GET");
            showText("2 - Fazer download de imagem");
            showText("3 - Mostrar links de página");
            showText("4 - Pesquisar palavras na página");
            showText("0 - Sair");
            let option = -1;
            while (option < 0 || option > 4) {
                cursorTo(process.stdout, 1);
                option = Number(question("Opção: "));
                console.log();
            }
            switch (option) {
                case 1:
                    console.log("Requisição GET");
                    this.viewStack.push(new GetMethodView());
                    break;
                case 2:
                    console.log("Fazer download de imagem");
                    break;
                case 3:
                    console.log("Mostrar links de página");
                    break;
                case 4:
                    console.log("Pesquisar palavras na página");
                    break;
                case 0:
                    console.log();
                    this.viewStack.push(new FarewellView());
                    break;
            }
        });
    }
}
export class GetMethodView {
    constructor() {
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            console.log();
            horizontalLine();
            showCenteredText("Requisição GET");
            horizontalLine();
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                showText("Insira a URL que deseja consultar.");
                console.log();
                cursorTo(process.stdout, 1);
                const url = question("URL: ");
                console.log();
                yield testGot(url);
                enterToContinue();
                resolve();
            }));
        });
    }
}
export class IntroView {
    constructor() {
        this.i = 0; // Frame atual
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                this.canSkip = true;
            }, 3333);
            return new Promise((resolve) => {
                let animationInterval = null;
                const runAnimation = () => {
                    clearView();
                    introText(this.i);
                    this.i++;
                    this.i = this.i % 6;
                    cursorTo(process.stdout, getColumns() - 2, getRows() - 4);
                    if (this.canSkip) {
                        console.log();
                        cursorTo(process.stdout, getColumns() / 2 - 6);
                        process.stdout.write('PRESS ENTER');
                    }
                    if (this.canSkip) {
                        if (animationInterval) {
                            clearInterval(animationInterval);
                        }
                        resolve();
                    }
                };
                // Atualizar o estado da animação e iniciar a próxima etapa
                const updateAnimation = () => {
                    runAnimation();
                };
                // Iniciar a animação inicial
                animationInterval = setInterval(updateAnimation, 168);
                // Permitir que o usuário pule a animação ao pressionar Enter
                process.stdin.once('keypress', (str, key) => {
                    if (key.name === 'return') {
                        this.canSkip = true;
                        if (animationInterval) {
                            clearInterval(animationInterval);
                        }
                        updateAnimation();
                    }
                });
            });
        });
    }
}
