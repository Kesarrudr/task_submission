"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const PORT = process.env.PORT || 6969;
const server = (0, _1.default)();
server.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}`);
});
