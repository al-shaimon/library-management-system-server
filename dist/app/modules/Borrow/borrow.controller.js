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
exports.BorrowController = void 0;
const borrow_service_1 = require("./borrow.service");
const http_status_1 = __importDefault(require("http-status"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_service_1.BorrowService.borrowBook(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Book borrowed successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            status: http_status_1.default.BAD_REQUEST,
            message: err.message,
        });
    }
});
const getOverdueBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_service_1.BorrowService.getOverdueBooks();
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: result.length ? 'Overdue borrow list fetched' : 'No overdue books',
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
exports.BorrowController = {
    borrowBook,
    getOverdueBooks,
};
