import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import CategoryController from  '../app/controllers/CategoryController';

import authMiddleware from '../app/middlewares/auth';
import productsRouter from './product'

const routes = new Router();

routes.post('/register', UserController.store);
routes.post('/sessions', SessionController.store);



routes.use(authMiddleware)

routes.use('/product', productsRouter)

routes.put('/update', UserController.update);

export default routes;