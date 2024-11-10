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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if book with the same title already exists
        const existingBook = yield prisma_1.default.book.findFirst({
            where: {
                title: {
                    equals: data.title,
                    mode: 'insensitive',
                },
            },
        });
        if (existingBook) {
            throw new Error('Book already exists');
        }
        // Create new book
        const result = yield prisma_1.default.book.create({
            data: {
                title: data.title,
                genre: data.genre,
                publishedYear: data.publishedYear,
                totalCopies: data.totalCopies,
                availableCopies: data.totalCopies,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.book.findMany({});
        if (!result.length) {
            throw new Error('No books available in the library');
        }
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.book.findUniqueOrThrow({
            where: {
                bookId,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const updateBook = (bookId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if book with the same title already exists
        if (data.title) {
            const existingBook = yield prisma_1.default.book.findFirst({
                where: {
                    AND: [
                        {
                            title: {
                                equals: data.title,
                                mode: 'insensitive',
                            },
                        },
                        {
                            bookId: {
                                not: bookId,
                            },
                        },
                    ],
                },
            });
            if (existingBook) {
                throw new Error('Book with this title already exists');
            }
        }
        const result = yield prisma_1.default.book.update({
            where: {
                bookId,
            },
            data,
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.book.delete({
            where: {
                bookId,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
