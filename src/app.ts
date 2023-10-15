import express, { Express } from 'express';
import { routesPoints, routesTrucks } from './routes'

const app:Express = express();

app.use(express.json());

app.use("/points",routesPoints);
app.use("/trucks",routesTrucks);

export default app;