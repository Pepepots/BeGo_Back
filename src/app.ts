import express, { Express } from 'express';
import { routesPoints, routesTrucks,routesRoute, ordersRoute, authRoute } from './routes'

const app:Express = express();

app.use(express.json());

app.use(authRoute);

app.use(routesPoints);
app.use(routesTrucks);
app.use(routesRoute);
app.use(ordersRoute)

export default app;