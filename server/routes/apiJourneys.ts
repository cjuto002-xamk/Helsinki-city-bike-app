import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiJourneysRouter : express.Router = express.Router();

apiJourneysRouter.use(express.json());

apiJourneysRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    let selectedMonth = req.query.selectedMonth
    let selectedFromDay = req.query.fromDay
    let selectedToDay = req.query.toDay
    
    try {
        if (Number(selectedFromDay) > 1 || Number(selectedFromDay) < 10) {
            selectedFromDay = `0${selectedFromDay}`
        }
        if(Number(selectedToDay) > 1 || Number(selectedToDay) < 10) {
            selectedToDay = `0${selectedToDay}`
        }
        const journeys = await prisma.journey.findMany({
            where: {
                Duration__sec_ : { gte: 10 },
                Covered_distance__m_ : { gte: 10 },
                Departure: { gte: `2021-0${selectedMonth}-${selectedFromDay}` },
                Return: { lte:  `2021-0${selectedMonth}-${selectedToDay}` }
            },
            take: 100,
        });
        // Send the journeys as the response
        res.json(journeys);
    } catch (e : any){
        console.log(e);
        res.sendStatus(500);
    }

});

export default apiJourneysRouter;