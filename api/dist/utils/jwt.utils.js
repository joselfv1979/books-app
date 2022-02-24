"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * generates JWT used for local testing
 */
function generateToken(id, username, role) {
    // information to be encoded in the JWT
    const payload = {
        username,
        id,
        role
    };
    // read private key value
    const privateKey = process.env.SECRET;
    const signInOptions = {
        expiresIn: '24h'
    };
    // generate JWT
    return (0, jsonwebtoken_1.sign)(payload, privateKey, signInOptions);
}
exports.generateToken = generateToken;
;
//# sourceMappingURL=jwt.utils.js.map