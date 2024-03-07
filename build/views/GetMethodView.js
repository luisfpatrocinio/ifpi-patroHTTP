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
import { View } from "./view.js";
import { clearView, enterToContinue, showText } from "./viewUtils.js";
import { question } from "readline-sync";
import { testGot } from "../utils/httpUtils.js";
export class GetMethodView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Requisição GET";
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            console.log();
            this.showHeader();
            showText("Insira a URL que deseja consultar.");
            console.log();
            showText("URL: ");
            cursorTo(process.stdout, 6);
            process.stdout.moveCursor(0, -1);
            const url = question("");
            console.log();
            yield testGot(url);
            enterToContinue();
            this.removeTopFromStack();
        });
    }
}
