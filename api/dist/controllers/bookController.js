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
exports.deleteBookController = exports.updateBookController = exports.createBookController = exports.getBookController = exports.getBooksController = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const CustomError_1 = require("../models/CustomError");
const mongodb_1 = require("mongodb");
const bookService_1 = require("../services/bookService");
function getBooksController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, bookService_1.getBooksService)();
            res.json(books);
        }
        catch (error) {
            next(new CustomError_1.CustomError(404, "Books not found"));
        }
    });
}
exports.getBooksController = getBooksController;
function getBookController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield (0, bookService_1.getBookService)(new mongodb_1.ObjectId(id));
            res.json(book);
        }
        catch (error) {
            next(new CustomError_1.CustomError(404, "Book not found"));
        }
    });
}
exports.getBookController = getBookController;
function createBookController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, author, price, pages } = req.body;
            console.log(req.body);
            if (!title || !author || !price) {
                next(new CustomError_1.CustomError(400, "Bad request"));
                return;
            }
            const newBook = new Book_1.default({
                title,
                author,
                price,
                pages: pages ? pages : null,
            });
            const book = yield (0, bookService_1.createBookService)(newBook);
            res.status(201).json(book);
        }
        catch (error) {
            next(new CustomError_1.CustomError(500, "Couldn' create new book"));
        }
    });
}
exports.createBookController = createBookController;
function updateBookController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, author, price, pages } = req.body;
            console.log(req.body);
            if (!title || !author || !price) {
                next(new CustomError_1.CustomError(400, "Bad request"));
                return;
            }
            const book = yield (0, bookService_1.updateBookService)(new mongodb_1.ObjectId(id), req.body);
            res.status(201).json(book);
        }
        catch (error) {
            next(new CustomError_1.CustomError(500, "Couldn't update book"));
        }
    });
}
exports.updateBookController = updateBookController;
function deleteBookController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield (0, bookService_1.deleteBookService)(new mongodb_1.ObjectId(id));
            // res.status(200).json({ message: "Book deleted" });
            res.status(204).end();
        }
        catch (error) {
            next(new CustomError_1.CustomError(500, "Couldn't delete book"));
        }
    });
}
exports.deleteBookController = deleteBookController;
//# sourceMappingURL=bookController.js.map