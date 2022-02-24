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
exports.deleteBookService = exports.updateBookService = exports.createBookService = exports.getBookService = exports.getBooksService = void 0;
const Book_1 = __importDefault(require("../models/Book"));
function getBooksService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Book_1.default.find();
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getBooksService = getBooksService;
function getBookService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Book_1.default.findById(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getBookService = getBookService;
function createBookService(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedBook = yield book.save();
            return savedBook;
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.createBookService = createBookService;
function updateBookService(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield Book_1.default.findByIdAndUpdate(id, book, { new: true });
            return response;
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.updateBookService = updateBookService;
function deleteBookService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Book_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.deleteBookService = deleteBookService;
//# sourceMappingURL=bookService.js.map