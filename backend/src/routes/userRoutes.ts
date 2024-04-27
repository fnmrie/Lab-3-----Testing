// ./src/routes/userRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/user', async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: 27, // Replace with the user's ID or use authentication to get the user's ID dynamically
            },
            select: {
                name: true,
                email: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
