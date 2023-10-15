import express, { Express } from 'express';
import { routesPoints } from './routes'

const app:Express = express();

app.use(express.json());

app.use(routesPoints);

export default app;