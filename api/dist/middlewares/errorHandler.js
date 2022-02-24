"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../models/CustomError");
const errorHandler = (err, req, res, next) => {
    console.log("Error handling middleware called.");
    // For unhandled errors.
    if (err instanceof CustomError_1.CustomError) {
        res.status(err.status).send(err.message);
    }
    else {
        res.status(500).send("Something went wrong");
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map