// ./src/routes/pogsRoutes.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/data', async (req: Request, res: Response) => {
    try {
        const allPogs = await prisma.pog.findMany();
        console.log("All Pogs:", allPogs); // Add this line for debugging
        res.json(allPogs);
    } catch (error) {
        console.error("Error fetching pogs:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
