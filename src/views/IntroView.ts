import { cursorTo } from "readline";
import { clearView, getColumns, getRows, introText, showCenteredText } from "./viewUtils.js";
import { View } from "./view.js";

export class IntroView extends View {
    public viewName: string = "Introdução";
    private i: number = 0;  // Frame atual
    private canSkip: boolean = false;

    public async show(): Promise<void> {

        setTimeout( ()=> {
            this.canSkip = true;
        }, 500);

        return new Promise((resolve) => {
            let animationInterval: NodeJS.Timeout | null = null;

            const runAnimation = () => {
                clearView();
                introText(this.i);
                this.i++;
                this.i = this.i % 6;
                cursorTo(process.stdout, getColumns() - 2, getRows() - 4);

                if (this.canSkip) {
                    console.log();
                    cursorTo(process.stdout, getColumns()/2 - 6);
                    process.stdout.write('PRESS ENTER');
                }

                if (this.canSkip) {
                    if (animationInterval) {
                        clearInterval(animationInterval);
                    }
                    this.removeMeFromStack();
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
    }
}