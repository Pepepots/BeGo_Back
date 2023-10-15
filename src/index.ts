import express, { Express, Request, Response } from 'express';

const app:Express = express();

app.get('/', (req:Request, res:Response) => {
    res.json({
        "message": "Init"
    })
})

app.listen(5000,() => {
    console.log("Iniciamos en puerto 5000");
});