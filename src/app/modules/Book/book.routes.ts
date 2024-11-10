import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/', BookController.createBook);

router.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Book Module!',
  });
});

export const BookRoutes = router;
