import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiJourneysRouter : express.Router = express.Router();

apiJourneysRouter.use(express.json());

apiJourneysRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
        res.json(await prisma.july.findMany({
            where: {
              AND:   [{ Departure_station_name: { contains: 'Velodrominrinne' } }, 
                    { Return_station_name: { contains: 'Venttiilikuja' } }],
            },
          }));
    } catch (e : any){
        console.log(e)
    }

});

//await prisma.henkilo.findMany()

export default apiJourneysRouter;