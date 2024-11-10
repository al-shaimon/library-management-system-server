import express from 'express';
import { BorrowController } from './borrow.controller';

const router = express.Router();

router.post('/', BorrowController.borrowBook);

export const BorrowRoutes = router;
