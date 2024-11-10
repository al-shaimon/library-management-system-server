import express, { Router } from 'express';
import { BookController } from './book.controller';
import { RequestHandler } from 'express';

const router: Router = express.Router();

const createBookHandler: RequestHandler = (req, res, next) => {
  BookController.createBook(req, res).catch(next);
};

const getAllBooksHandler: RequestHandler = (req, res, next) => {
  BookController.getAllBooks(req, res).catch(next);
};

const getBookByIdHandler: RequestHandler = (req, res, next) => {
  BookController.getBookById(req, res).catch(next);
};

const updateBookHandler: RequestHandler = (req, res, next) => {
  BookController.updateBook(req, res).catch(next);
};

const deleteBookHandler: RequestHandler = (req, res, next) => {
  BookController.deleteBook(req, res).catch(next);
};

router.post('/', createBookHandler);
router.get('/', getAllBooksHandler);
router.get('/:bookId', getBookByIdHandler);
router.put('/:bookId', updateBookHandler);
router.delete('/:bookId', deleteBookHandler);

export const BookRoutes = router;
