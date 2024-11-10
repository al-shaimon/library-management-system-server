"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const http_status_1 = __importDefault(require("http-status"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.createBook(req.body);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to create book',
            });
        }
        res.status(http_status_1.default.CREATED).json({
            success: true,
            status: http_status_1.default.CREATED,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.getAllBooks();
        if (!result.length) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                status: http_status_1.default.NOT_FOUND,
                message: 'No books available in the library',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Books retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookService.getBookById(bookId);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                status: http_status_1.default.NOT_FOUND,
                message: 'Book not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Book retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookService.updateBook(bookId, req.body);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to update book',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Book updated successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookService.deleteBook(bookId);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to delete book',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Book successfully deleted',
        });
    }
    catch (err) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
});
exports.BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
