import express from 'express';
import path from 'path';

const app  : express.Application = express();

const port : number = Number(process.env.PORT) || 3103; 

app.use(express.static(path.resolve(__dirname, "public")));

app.listen(port, () => { //Console log for server
    console.log(`Server started to port ${port}`)
})