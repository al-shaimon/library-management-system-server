import express from 'express';
import { BorrowController } from './borrow.controller';

const router = express.Router();

router.post('/', BorrowController.borrowBook);

router.get('/overdue', BorrowController.getOverdueBooks);

export const BorrowRoutes = router;
