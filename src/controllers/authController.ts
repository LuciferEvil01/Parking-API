import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateAuthToken = (user: any) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
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
export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crea un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'client'  // Asigna el rol, por defecto 'client' si no se proporciona
    });

    // Guarda el usuario en la base de datos
    await newUser.save();

    // Genera un token de autenticación
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};





export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid login credentials');
    }

    const token = generateAuthToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Invalid login credentials' });
  }
};
