"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    pages: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
BookSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = (0, mongoose_1.model)("Book", BookSchema);
//# sourceMappingURL=Book.js.map