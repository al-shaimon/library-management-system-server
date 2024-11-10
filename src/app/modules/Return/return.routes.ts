import express from 'express';
import { ReturnBookController } from './return.controller';

const router = express.Router();

router.post('/', ReturnBookController.returnBook);

export const ReturnRoutes = router;
