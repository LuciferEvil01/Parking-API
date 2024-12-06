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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.User(userData);
    yield user.save();
    return user;
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.find({});
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findById(id);
});
exports.getUserById = getUserById;
const updateUser = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    Object.assign(user, updates);
    yield user.save();
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByIdAndDelete(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userService.js.map