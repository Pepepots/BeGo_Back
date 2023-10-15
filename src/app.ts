import express, { Express } from 'express';
import { routesPoints, routesTrucks,routesRoute, ordersRoute } from './routes'

const app:Express = express();

app.use(express.json());

app.use(routesPoints);
app.use(routesTrucks);
app.use(routesRoute);
app.use(ordersRoute)

export default app;