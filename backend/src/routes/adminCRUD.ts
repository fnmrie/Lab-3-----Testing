import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

function routes(app: Express) {
    app.post("/pogs", async (req: Request, res: Response) => {
        try {
            const { name, ticker_symbol, price, color } = req.body;
            const existingPog = await prisma.pog.findUnique({
                where: { ticker_symbol },
            });
            if (existingPog) {
                return res.status(422).json({ error: "Ticker symbol already exists" });
            }
            const createdPog = await prisma.pog.create({
                data: { name, ticker_symbol, price, color },
            });
            res.status(201).json(createdPog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create pog" });
        }
    });

    app.get("/pogs", async (req: Request, res: Response) => {
        try {
            const pogs = await prisma.pog.findMany();
            res.status(200).json(pogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.get("/pogs/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const pog = await prisma.pog.findUnique({
                where: { id: parseInt(id) },
            });
            if (!pog) {
                return res.status(404).json({ error: "Pog not found" });
            }
            res.status(200).json(pog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.patch("/pogs/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, ticker_symbol, price, color } = req.body;

            const existingPogWithTicker = await prisma.pog.findFirst({
                where: {
                    ticker_symbol,
                    NOT: {
                        id: parseInt(id),
                    },
                },
            });
            if (existingPogWithTicker) {
                return res.status(422).json({ error: "Ticker symbol already exists" });
            }

            const updatedPog = await prisma.pog.update({
                where: { id: parseInt(id) },
                data: { name, ticker_symbol, price, color },
            });
            res.status(200).json(updatedPog);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: "Pog not found or update failed" });
        }
    });

    app.delete("/pogs/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await prisma.pog.delete({
                where: { id: parseInt(id) },
            });
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: "Pog not found" });
        }
    });
}

export default routes;
