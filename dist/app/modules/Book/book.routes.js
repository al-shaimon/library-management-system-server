"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
const createBookHandler = (req, res, next) => {
    book_controller_1.BookController.createBook(req, res).catch(next);
};
const getAllBooksHandler = (req, res, next) => {
    book_controller_1.BookController.getAllBooks(req, res).catch(next);
};
const getBookByIdHandler = (req, res, next) => {
    book_controller_1.BookController.getBookById(req, res).catch(next);
};
const updateBookHandler = (req, res, next) => {
    book_controller_1.BookController.updateBook(req, res).catch(next);
};
const deleteBookHandler = (req, res, next) => {
    book_controller_1.BookController.deleteBook(req, res).catch(next);
};
router.post('/', createBookHandler);
router.get('/', getAllBooksHandler);
router.get('/:bookId', getBookByIdHandler);
router.put('/:bookId', updateBookHandler);
router.delete('/:bookId', deleteBookHandler);
exports.BookRoutes = router;
