"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const User_1 = __importDefault(require("../models/User"));
const CustomError_1 = require("../models/CustomError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_utils_1 = require("../utils/jwt.utils");
function loginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield User_1.default.findOne({ username });
            const passwordCorrect = user === null ? false : yield bcrypt_1.default.compare(password, user.passwordHash);
            if (!user || !passwordCorrect) {
                next(new CustomError_1.CustomError(401, "Invalid credentials"));
            }
            const token = (0, jwt_utils_1.generateToken)(user.id, username, user.role);
            res.send({
                id: user.id,
                username,
                role: user.role,
                token
            });
        }
        catch (error) {
            // next(new CustomError(500, "Couldn't login user"));
            console.log(error);
        }
    });
}
exports.loginController = loginController;
//# sourceMappingURL=loginController.js.map