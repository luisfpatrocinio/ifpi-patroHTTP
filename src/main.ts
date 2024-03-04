import { got, Response } from 'got';
import { question } from 'readline-sync';
import { cursorTo } from 'readline';
import {
    clearTerminal,
    clearView,
    showText,
    horizontalLine,
    showCenteredText,
    enterToContinue,
    getRows,
    introText
} from './utils/viewUtils.js';
import { App } from "./app.js";

let actualColorHex = "#FFFFFF";

export function setColor(color: string) {
    actualColorHex = color;
}

export function getColor() : string {
    return actualColorHex;
}




function main() {
    const app = new App();
    app.run();
}

main();