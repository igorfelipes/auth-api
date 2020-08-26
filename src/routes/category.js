import { Router } from 'express';

import CategoryController from  '../app/controllers/CategoryController';

const router = new Router();


router.get('/', CategoryController.index);
router.get('/:id', CategoryController.show);
router.post('/create', CategoryController.store);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.destroy);

export default router