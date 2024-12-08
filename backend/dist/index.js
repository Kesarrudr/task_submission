"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const utilis_1 = require("./utilis");
const v1_1 = require("./version/v1");
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/api/v1", v1_1.V1Route);
    //Error Handler must be last
    app.use(utilis_1.errorHandler);
    return app;
};
exports.default = createServer;
