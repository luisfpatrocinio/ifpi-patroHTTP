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
import { clearView, getColumns, getRows, introText } from "./viewUtils.js";
import { View } from "./view.js";
export class IntroView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Introdução";
        this.i = 0; // Frame atual
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                this.canSkip = true;
            }, 500);
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
                        this.removeMeFromStack();
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
