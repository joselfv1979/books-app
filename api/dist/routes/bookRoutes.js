"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const authHandler = require('../middlewares/authHandler');
const booksRouter = (0, express_1.Router)();
booksRouter.get("/", bookController_1.getBooksController);
booksRouter.get("/:id", bookController_1.getBookController);
booksRouter.post("/", bookController_1.createBookController);
booksRouter.put("/:id", bookController_1.updateBookController);
booksRouter.delete("/:id", bookController_1.deleteBookController);
exports.default = booksRouter;
//# sourceMappingURL=bookRoutes.js.map