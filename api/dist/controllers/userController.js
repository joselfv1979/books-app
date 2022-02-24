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
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserController = exports.getUsersController = void 0;
const User_1 = __importDefault(require("../models/User"));
const CustomError_1 = require("../models/CustomError");
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("../services/userService");
function getUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getUsersService)();
            res.json(users);
        }
        catch (error) {
            next(new CustomError_1.CustomError(404, "Users not found"));
        }
    });
}
exports.getUsersController = getUsersController;
function getUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, userService_1.getUserService)(new mongodb_1.ObjectId(id));
            res.json(data);
        }
        catch (error) {
            next(new CustomError_1.CustomError(404, "User not found"));
        }
    });
}
exports.getUserController = getUserController;
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullName, username, email, password } = req.body;
            console.log(req.body);
            if (!fullName || !username || !email || !password) {
                next(new CustomError_1.CustomError(400, "Bad request"));
            }
            const SaltRounds = 10;
            const passwordHash = yield bcrypt_1.default.hash(password, SaltRounds);
            const newuser = new User_1.default({
                fullName,
                username,
                email,
                passwordHash,
                role: "user",
            });
            const response = yield (0, userService_1.createUserService)(newuser);
            res.status(201).json(response);
        }
        catch (error) {
            next(new CustomError_1.CustomError(500, "Couldn't create new user"));
        }
    });
}
exports.createUserController = createUserController;
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { fullName, username, email } = req.body;
            if (!fullName || !username || !email) {
                next(new CustomError_1.CustomError(400, "Bad request"));
            }
            const user = yield (0, userService_1.updateUserService)(new mongodb_1.ObjectId(id), req.body);
            res.status(201).json(user);
        }
        catch (error) {
            next(new CustomError_1.CustomError(500, "Couldn't update user"));
        }
    });
}
exports.updateUserController = updateUserController;
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield (0, userService_1.deleteUserService)(new mongodb_1.ObjectId(id));
            res.status(204).end();
        }
        catch (error) {
            throw new CustomError_1.CustomError(500, "Couldn't delete user");
        }
    });
}
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=userController.js.map