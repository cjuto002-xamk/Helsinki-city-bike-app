import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiStationsRouter : express.Router = express.Router();

apiStationsRouter.use(express.json());

apiStationsRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
        res.json(await prisma.stations.findMany({
          }));
    } catch (e : any){
        console.log(e)
    }

});

//await prisma.henkilo.findMany()

export default apiStationsRouter;