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
import { clearView, enterToContinue, getColumns, introText, showText } from "./viewUtils.js";
export class MenuView {
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            // clearView();
            showText("Bem vindo ao programa.");
        });
    }
}
export class IntroView {
    constructor() {
        this.texto = "";
        this.i = 0;
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
                setTimeout(() => {
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
                    setTimeout(() => {
                        // Encerrar animação
                        this.canSkip = true;
                        // this.canSkip = true;
                    }, 3000);
                    // Enquanto não tiver encerrado, continuar exibindo.
                    if (!this.canSkip) {
                        this.show();
                    }
                    else {
                        // Terminou a animação, sair ao apertar Enter.
                        enterToContinue();
                    }
                }, 168);
            });
        });
    }
}
