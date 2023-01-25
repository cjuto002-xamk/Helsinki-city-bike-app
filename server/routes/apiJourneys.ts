import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiJourneysRouter : express.Router = express.Router();

apiJourneysRouter.use(express.json());

apiJourneysRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    // Get the selected month from the query string
    let selectedMonth = req.query.selectedMonth;
    let selectedFromDay = req.query.fromDay
    let selectedToDay = req.query.toDay
    
    // 
    try {
        if (Number(selectedFromDay) >= 1 && Number(selectedFromDay) < 10) {
            selectedFromDay = `0${selectedFromDay}`
        }
        if(Number(selectedToDay) >= 1 && Number(selectedToDay) < 10) {
            selectedToDay = `0${selectedToDay}`
        }
        switch (selectedMonth) {
            case "5":
                console.log("may");
                const mayJourneys = await prisma.may.findMany({
                    where: {
                        Duration__sec_ : { gte: 10 },
                        Covered_distance__m_ : { gte: 10 },
                        Departure: { gte: `2021-0${selectedMonth}-${selectedFromDay}` },
                        Return: { lte:  `2021-0${selectedMonth}-${selectedToDay}` }
                    },
                    take: 100,
                });
                res.json(mayJourneys);
                console.log(mayJourneys);
                break;
            case "6":
                console.log("june");
                const juneJourneys = await prisma.june.findMany({
                    where: {
                        Duration__sec_ : { gte: 10 },
                        Covered_distance__m_ : { gte: 10 },
                        Departure: { gte: `2021-0${selectedMonth}-${selectedFromDay}` },
                        Return: { lte:  `2021-0${selectedMonth}-${selectedToDay}` }
                    },
                    take: 100,
                });
                res.json(juneJourneys);
                break;
            case "7":
                console.log("july");
                const julyJourneys = await prisma.july.findMany({
                    where: {
                        Duration__sec_ : { gte: 10 },
                        Covered_distance__m_ : { gte: 10 },
                        Departure: { gte: `2021-0${selectedMonth}-${selectedFromDay}` },
                        Return: { lte:  `2021-0${selectedMonth}-${selectedToDay}` }
                    },
                    take: 100,
                });
                res.json(julyJourneys);
                break;
            default:
                res.status(400).json({ error: "Invalid month selected" });
        }
    } catch (e : any){
        console.log(e);
        res.sendStatus(500);
    }

});

export default apiJourneysRouter;