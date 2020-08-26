import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import authMiddleware from '../app/middlewares/auth';
import productsRouter from './product';
import categoriesRouter from './category'

const routes = new Router();

routes.post('/register', UserController.store);
routes.post('/sessions', SessionController.store);


// Routes with authentication 
routes.use(authMiddleware)

routes.use('/product', productsRouter)
routes.use('/category', categoriesRouter)

//User 
routes.put('/update', UserController.update);

export default routes;