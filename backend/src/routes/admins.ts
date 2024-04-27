// ./src/routes/authRoutes.ts

import express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const admin = await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
                role: role || 'ADMIN'
            }
        });
        res.status(201).json(admin);
      } catch (error) {
        const typedError = error as { message: string }; // Type assertion
        res.status(400).json({ error: typedError.message });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { username } });
        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({ adminId: admin.id, role: admin.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
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
