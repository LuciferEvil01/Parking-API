"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const mongoose_1 = require("mongoose");
const logSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });
exports.Log = (0, mongoose_1.model)('Log', logSchema);
//# sourceMappingURL=Log.js.map