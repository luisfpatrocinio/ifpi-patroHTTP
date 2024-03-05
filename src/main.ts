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