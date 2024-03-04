import chalk from 'chalk';
import { cursorTo } from "readline";
import { question } from 'readline-sync';
import { getColor, setColor } from '../main.js';
export function clearTerminal() {
    // Limpar terminal.
    console.clear();
}
export function clearView() {
    // Limpar terminal.
    clearTerminal();
    // Propriedades da borda
    const columns = process.stdout.columns;
    const rows = getRows();
    const borderChar = "█";
    const border = borderChar.repeat(columns); // Linha totalmente preenchida
    const padding = ' '.repeat(columns - 2); // Espaço vazio
    // Função para colorir a borda
    let borderColorize = chalk.hex("#22122c");
    // Posicionar cursor no canto da tela.
    cursorTo(process.stdout, 0, 0);
    // Subir para linha anterior
    process.stdout.write('\x1b[1A');
    // Desenhar borda superior
    setBGCol(borderColorize(border + '\n'));
    // Desenhar linhas laterais
    for (let i = 0; i < rows - 4; i++) {
        setBGCol(borderColorize(borderChar + padding + borderChar + '\n'));
    }
    // Desenhar borda inferior
    setBGCol(borderColorize(border + '\n'));
    // Definir posição do cursor no canto da tela.
    cursorTo(process.stdout, 0, 0);
}
export function setBGCol(text) {
    process.stdout.write(chalk.bgHex('#2e0840')(text));
}
export function showText(text, position = 1) {
    // Definir a posição 1 caractere após a borda esquerda.
    cursorTo(process.stdout, position);
    setBGCol(chalk.hex(getColor())(text));
    console.log();
}
export function horizontalLine() {
    // Número de colunas
    const columns = getColumns() - 2;
    // Cores usadas
    const colors = ['#040519', '#22122c', '#432547', '#604c7d', '#908cc7', '#b0cfee', '#ffffff'];
    // Quantidade de segmentos
    const piecesNumber = colors.length * 2;
    // Cada segmento
    const charPerPiece = Math.floor(columns / piecesNumber);
    const linePiece = '#'.repeat(charPerPiece);
    // Criar linha
    let line = "";
    for (var i = 0; i < piecesNumber; i++) {
        let _n = (i < colors.length) ? i : colors.length - (i - colors.length) - 1; // Definir cor
        line += chalk.hex(colors[_n])(linePiece);
    }
    const _diff = Math.abs(charPerPiece * piecesNumber - columns);
    if (_diff > 0) {
        const _border = chalk.hex(colors[0])('#'.repeat(_diff / 2));
        line = _border + line + _border;
    }
    // Desenhar linha
    showText(line);
}
export function getColumns() {
    return process.stdout.columns;
}
export function getRows() {
    return process.stdout.rows;
}
export function enterToContinue() {
    console.log();
    showText(chalk.inverse("[ENTER]"), getColumns() / 2 - 4);
    let txt = question("", { hideEchoBack: true, mask: '' });
}
export function showCenteredText(text) {
    const columns = getColumns();
    const padding = Math.floor((columns - text.length) / 2);
    showText(text, padding);
}
export function introText(step) {
    // pular metade da altura da tela:
    let rows = getRows();
    for (let i = 0; i < rows / 2 - 6; i++) {
        console.log();
    }
    const pos = (getColumns() - 50) / 2;
    let colors = ["#FFFFFF", "#b0cfee", "#908cc7", "#604c7d", "#908cc7", "#b0cfee"];
    let N = colors.length;
    setColor(colors[step % N]);
    showText(chalk.bold("888b.       w              8   8 88888 88888 888b."), pos);
    setColor(colors[(step + 1) % N]);
    showText(chalk.bold("8  .8 .d88 w8ww 8d8b .d8b. 8www8   8     8   8  .8"), pos);
    showText(chalk.bold("8wwP' 8  8  8   8P   8' .8 8   8   8     8   8wwP'"), pos);
    setColor(colors[(step + 2) % N]);
    showText(chalk.bold("8     `Y88  Y8P 8    `Y8P' 8   8   8     8   8"), pos);
    console.log();
    setColor("#5adbfa");
    showCenteredText("Exercício 01 - Requisições HTTP");
    console.log();
    showCenteredText("Desenvolvido por Luis Felipe Patrocinio");
    showCenteredText("Prof. Ely Miranda");
    console.log();
    showCenteredText("IFPI - Análise e Desenvolvimento de Sistemas");
    showCenteredText("Março - 2024");
    // enterToContinue();
}
export function showHeader(header) {
    horizontalLine();
    showCenteredText(header);
    horizontalLine();
}
