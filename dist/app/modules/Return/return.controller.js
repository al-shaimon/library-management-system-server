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
exports.ReturnBookController = void 0;
const return_service_1 = require("./return.service");
const http_status_1 = __importDefault(require("http-status"));
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield return_service_1.ReturnBookService.returnBook(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Book returned successfully',
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
exports.ReturnBookController = {
    returnBook,
};
