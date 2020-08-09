import { Router, Request, Response } from 'express';
import ClassController from '../controller/ClassesController';

const classRoutes = Router();
const classController = new ClassController();

classRoutes.post('/', classController.create);
classRoutes.get('/', classController.index);


export default classRoutes