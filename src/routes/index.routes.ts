import { Router, Request, Response } from 'express';

import classRoutes from './classes.routes';
const routes = Router();

routes.use('/classes', classRoutes);

export default routes;