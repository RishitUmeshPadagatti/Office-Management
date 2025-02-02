import { PrismaClient } from "@prisma/client";
import express from "express"

const testRouter = express.Router()

const prisma = new PrismaClient();

testRouter.post('/offices/:officeId/floors', async (req, res) => {
    const { officeId } = req.params;
    const { name } = req.body;

    try {
        const floor = await prisma.floor.create({
            data: {
                name,
                officeId: parseInt(officeId, 10),
            },
        });
        res.status(201).json(floor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create floor' });
    }
});

testRouter.get('/offices/:officeId/floors', async (req, res) => {
    const { officeId } = req.params;

    try {
        const floors = await prisma.floor.findMany({
            where: { officeId: parseInt(officeId, 10) },
            include: {
                desks: true,
                cabins: true,
            },
        });
        res.status(200).json(floors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch floors' });
    }
});

testRouter.put('/desks/:deskId/occupy', async (req, res) => {
    const { deskId } = req.params;
    const { employeeId } = req.body;

    try {
        const desk = await prisma.desk.update({
            where: { id: parseInt(deskId, 10) },
            data: { occupiedById: employeeId },
        });
        res.status(200).json(desk);
    } catch (error) {
        res.status(500).json({ error: 'Failed to allocate employee to desk' });
    }
});

testRouter.put('/cabins/:cabinId/occupy', async (req, res) => {
    const { cabinId } = req.params;
    const { employeeId } = req.body;

    try {
        const cabin = await prisma.cabin.update({
            where: { id: parseInt(cabinId, 10) },
            data: { occupiedById: employeeId },
        });
        res.status(200).json(cabin);
    } catch (error) {
        res.status(500).json({ error: 'Failed to allocate employee to cabin' });
    }
});

export default testRouter