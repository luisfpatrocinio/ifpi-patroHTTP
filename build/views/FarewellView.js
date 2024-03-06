var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { View } from "./view.js";
import { clearTerminal, clearView, showCenteredText } from "./viewUtils.js";
export class FarewellView extends View {
    constructor() {
        super(...arguments);
        this.viewName = "Fim";
        this.canSkip = false;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            clearView();
            for (let i = 0; i < 6; i++) {
                console.log();
            }
            showCenteredText("Fim.");
            setTimeout(() => {
                this.canSkip = true;
            }, 500);
            return new Promise((resolve) => {
                if (this.canSkip) {
                    clearTerminal();
                    resolve();
                }
            });
        });
    }
}
