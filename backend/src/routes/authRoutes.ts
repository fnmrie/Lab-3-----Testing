// ./src/routes/authRoutes.ts

import express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'USER'
            }
        });
        res.status(201).json(user);
      } catch (error) {
        const typedError = error as { message: string }; // Type assertion
        res.status(400).json({ error: typedError.message });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
      } catch (error) {
        const typedError = error as { message: string }; // Type assertion
        res.status(400).json({ error: typedError.message });
    }
});

export default router;
