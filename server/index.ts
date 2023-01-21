import express from 'express';
import path from 'path';
import apiJourneysRouter from './routes/apiJourneys'
import apiStationsRouter from './routes/apiStations'
import cors from 'cors'

const app  : express.Application = express();

const port : number = Number(process.env.PORT) || 3100;

app.use(cors({origin : "http://localhost:3000"}));

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/journeys", apiJourneysRouter);

app.use("/api/stations", apiStationsRouter);

app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (!res.headersSent) {
        res.status(404).json({ viesti : "Virheellinen reitti"});
    }

    next();

});

app.listen(port, () => { //Console log for server
    console.log(`Server started to port ${port}`)
})