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
import { clearTerminal, clearView, enterToContinue, getColumns, horizontalLine, introText, showCenteredText, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { testGot } from "./httpUtils.js";
export class MenuView {
    constructor() {
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            console.log();
            horizontalLine();
            showCenteredText("Exercício 01 - Requisições HTTP");
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
        this.i = 0;
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
                    cursorTo(process.stdout, getColumns() / 2);
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
            setTimeout(() => {
                this.canSkip = true;
            }, 1000);
            setTimeout(() => {
                // Enquanto não tiver encerrado, continuar exibindo.
                if (!this.canSkip) {
                    this.show();
                }
                else {
                    // Terminou a animação, sair ao apertar Enter.
                    enterToContinue();
                    clearTerminal();
                }
            }, 168);
        });
    }
}
