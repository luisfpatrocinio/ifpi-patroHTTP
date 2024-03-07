import { showText } from '../views/viewUtils.js';
import { question } from 'readline-sync';
export function getInput() {
    return "";
}
export function getNumberInput(label = "Numero") {
    showText(label + ": ", 1);
    process.stdout.moveCursor(label.length + 3, -1);
    let input = "";
    while (input === "") {
        input = question("");
        process.stdout.moveCursor(label.length + 3, -1);
    }
    console.log();
    return Number(input);
}
export function getTextInput(label = "Texto") {
    showText(label + ": ", 1);
    process.stdout.moveCursor(label.length + 3, -1);
    let input = "";
    while (input === "") {
        input = question("");
        process.stdout.moveCursor(label.length + 3, -1);
    }
    console.log();
    return input;
}
