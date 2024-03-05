import { cursorTo } from "readline";
import { clearTerminal, clearView, enterToContinue, getColumns, getRows, horizontalLine, introText, showCenteredText, showHeader, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { testGot } from "./httpUtils.js";
import { Console } from "console";

export interface View {
    show(): void;
}

// export class FarewellView implements View {
//     canSkip: boolean = false;
    
//     public async show(): Promise<void> {
//         clearView();
//         for (let i = 0; i < 6; i++) {
//             console.log();
//         }
//         showCenteredText("Fim.");

//         setTimeout( ()=> {
//             this.canSkip = true;
//         }, 3333);

//         return new Promise((resolve) => {
//             if (this.canSkip) {
//                 process.exit();
//                 resolve();
//             }
//         });
//     }
// }

export class MainMenu implements View {
    show(): void {
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
                console.log("Requisição GET")
                // Adicionar a view de requisição GET no topo da Pilha do App
                // COMO ACESSAR A PILHA DO APP? >>> App.viewStack.push(new GetMethodView());
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
                console.log()
                // new FarewellView().show();
                break;
        }
    }
}

export class GetMethodView implements View {
    private canSkip: boolean = false;

    public async show(): Promise<void> {
        clearView();
        console.log();
        horizontalLine();
        showCenteredText("Requisição GET");
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