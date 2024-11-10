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
exports.BorrowService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const borrowBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield prisma_1.default.book.findUnique({
            where: {
                bookId: data.bookId,
            },
        });
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.availableCopies <= 0) {
            throw new Error('Book is not available');
        }
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.book.update({
                where: {
                    bookId: data.bookId,
                },
                data: {
                    availableCopies: {
                        decrement: 1,
                    },
                },
            });
            const borrowedRecord = yield transactionClient.borrowRecord.create({
                data: {
                    bookId: data.bookId,
                    memberId: data.memberId,
                    borrowDate: new Date(),
                    returnDate: data.returnDate || null,
                },
                select: {
                    borrowId: true,
                    bookId: true,
                    memberId: true,
                    borrowDate: true,
                },
            });
            return borrowedRecord;
        }));
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getOverdueBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        const overdueBooks = yield prisma_1.default.borrowRecord.findMany({
            where: {
                borrowDate: {
                    lte: fourteenDaysAgo,
                },
                returnDate: null,
            },
            include: {
                book: true,
                member: true,
            },
        });
        const formattedOverdueBooks = overdueBooks.map((record) => {
            const overdueDays = Math.floor((new Date().getTime() - new Date(record.borrowDate).getTime()) / (1000 * 60 * 60 * 24) - 14);
            return {
                borrowId: record.borrowId,
                bookTitle: record.book.title,
                borrowerName: record.member.name,
                overdueDays: overdueDays,
            };
        });
        return formattedOverdueBooks;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.BorrowService = {
    borrowBook,
    getOverdueBooks,
};
