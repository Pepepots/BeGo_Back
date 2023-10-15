import express, { Express } from 'express';
import { routesPoints, routesTrucks } from './routes'

const app:Express = express();

app.use(express.json());

app.use(routesPoints);
app.use(routesTrucks);

export default app;