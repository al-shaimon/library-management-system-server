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
exports.ReturnBookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const returnBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowRecord = yield prisma_1.default.borrowRecord.findUnique({
            where: {
                borrowId: data.borrowId,
            },
            include: {
                book: true,
            },
        });
        if (!borrowRecord) {
            throw new Error('Borrow record not found');
        }
        if (borrowRecord.returnDate) {
            throw new Error('Book has already been returned');
        }
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.book.update({
                where: {
                    bookId: borrowRecord.bookId,
                },
                data: {
                    availableCopies: {
                        increment: 1,
                    },
                },
            });
            yield transactionClient.borrowRecord.update({
                where: {
                    borrowId: data.borrowId,
                },
                data: {
                    returnDate: new Date(),
                },
            });
        }));
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.ReturnBookService = {
    returnBook,
};
