import { cursorTo } from "readline";
import { clearTerminal, clearView, enterToContinue, getColumns, horizontalLine, introText, showCenteredText, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { testGot } from "./httpUtils.js";

export interface View {
    show(): void;
}

export class MenuView implements View {
    private canSkip: boolean = false;

    public async show(): Promise<void> {
        clearView();
        console.log();
        horizontalLine();
        showCenteredText("Exercício 01 - Requisições HTTP");
        horizontalLine();

        return new Promise(async (resolve) => {
            showText("Insira a URL que deseja consultar.");
            console.log();
            cursorTo(process.stdout, 1);
            const url = question("URL: ");
            console.log();

            await testGot(url);

            enterToContinue();
            resolve();
        });
    }
}

export class IntroView implements View {
    private i: number = 0;
    private canSkip: boolean = false;

    public async show(): Promise<void> {

        setTimeout( ()=> {
            this.canSkip = true;
        }, 3333);

        return new Promise((resolve) => {
            let animationInterval: NodeJS.Timeout | null = null;

            const runAnimation = () => {
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

                if (this.canSkip) {
                    if (animationInterval) {
                        clearInterval(animationInterval);
                    }
                    resolve();
                }
            }

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
            } else {
            // Terminou a animação, sair ao apertar Enter.
                enterToContinue();
                clearTerminal();
            }
        }, 168);
    }
}