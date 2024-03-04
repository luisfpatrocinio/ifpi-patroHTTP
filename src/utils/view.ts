import { cursorTo } from "readline";
import { getInput } from "./input.js";
import { clearView, enterToContinue, getColumns, introText, showText } from "./viewUtils.js";

export interface View {
    show(): void;
}

export class MenuView implements View {
    public async show(): Promise<void> {
        // clearView();
        showText("Bem vindo ao programa.");
    }
}

export class IntroView implements View {
    private texto: string = "";

    private i: number = 0;
    private canSkip: boolean = false;

    public async show(): Promise<void> {
        await new Promise<void>(resolve => {
            setTimeout(() => {
                clearView();
                introText(this.i);
                this.i++;
                this.i = this.i % 6;

                cursorTo(process.stdout, getColumns()/2);
                
                if (this.canSkip) {
                    console.log();
                    cursorTo(process.stdout, getColumns()/2 - 6);
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
                } else {
                // Terminou a animação, sair ao apertar Enter.
                    enterToContinue();
                }
            }, 168);
        });        
    }
}