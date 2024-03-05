import { App } from "./app.js";
let actualColorHex = "#FFFFFF";
export function setColor(color) {
    actualColorHex = color;
}
export function getColor() {
    return actualColorHex;
}
function main() {
    const app = new App();
    app.run();
}
main();
