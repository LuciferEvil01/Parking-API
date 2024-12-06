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
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateAuthToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 8);
//     const user = new User({ username, email, password: hashedPassword, role });
//     await user.save();
//     const token = generateAuthToken(user);
//     res.status(201).send({ user, token });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };
// Función para registrar un nuevo usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Verifica si el usuario ya existe
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Encripta la contraseña
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Crea un nuevo usuario
        const newUser = new User_1.User({
            username,
            email,
            password: hashedPassword,
            role: role || 'client' // Asigna el rol, por defecto 'client' si no se proporciona
        });
        // Guarda el usuario en la base de datos
        yield newUser.save();
        // Genera un token de autenticación
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ result: newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            throw new Error('Invalid login credentials');
        }
        const token = generateAuthToken(user);
        res.send({ user, token });
    }
    catch (error) {
        res.status(400).send({ error: 'Invalid login credentials' });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map