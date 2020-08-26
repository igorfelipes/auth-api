import { Router } from 'express';

import ProductController from  '../app/controllers/ProductController';

const router = new Router();


router.get('/', ProductController.index);
router.get('/:id', ProductController.show);
router.post('/create', ProductController.store);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

export default router