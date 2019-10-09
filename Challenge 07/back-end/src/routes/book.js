import { Router } from 'express';
import * as controller from '../controllers/book'

export const router = Router();

router.get('/', controller.getBooks);
router.get('/:id', controller.getBookById);
router.get('/lend/:id', controller.lendBook);
router.get('/return/:id', controller.returnBook);