"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const connect_1 = require("./db/connect");
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const createAdmin_1 = require("./utils/createAdmin");
if (!process.env.PORT) {
    process.exit(1);
}
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Create admin app utility
(0, createAdmin_1.createAdminUser)();
// Routes
app.use("/api/login", LoginRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/books", bookRoutes_1.default);
// Error handler middleware 
app.use(errorHandler_1.errorHandler);
const PORT = parseInt(process.env.PORT, 10);
(0, connect_1.connect)();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map