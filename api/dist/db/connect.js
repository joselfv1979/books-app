"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_CONN_STRING } = process.env;
const connectionString = DB_CONN_STRING;
if (!connectionString) {
    console.error("Remember to have environment variables on a  file .env");
}
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
//connection mongodb atlas
const connect = () => {
    mongoose_1.default
        .connect(connectionString, options)
        .then(() => console.log("Database connected!"))
        .catch((err) => console.log(err));
};
exports.connect = connect;
process.on("uncaughtException", (error) => {
    console.error(error);
    mongoose_1.default.disconnect();
});
//# sourceMappingURL=connect.js.map