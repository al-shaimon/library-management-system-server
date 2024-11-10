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
exports.MemberService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEmail = yield prisma_1.default.member.findFirst({
            where: {
                email: {
                    equals: data.email,
                    mode: 'insensitive',
                },
            },
        });
        if (existingEmail) {
            throw new Error('Member with this email already exists');
        }
        const result = yield prisma_1.default.member.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                membershipDate: data.membershipDate || new Date(),
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.member.findMany({});
        if (!result.length) {
            throw new Error('No members available in the library');
        }
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const getMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.member.findUniqueOrThrow({
            where: {
                memberId,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const updateMember = (memberId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.member.findUniqueOrThrow({
            where: {
                memberId,
            },
        });
        const result = yield prisma_1.default.member.update({
            where: {
                memberId,
            },
            data,
            select: {
                memberId: true,
                name: true,
                email: true,
                phone: true,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowRecords = yield prisma_1.default.borrowRecord.findFirst({
            where: {
                memberId,
                returnDate: null,
            },
        });
        if (borrowRecords) {
            throw new Error('Cannot delete member with active borrowed books. Please ensure all books are returned first.');
        }
        const result = yield prisma_1.default.member.delete({
            where: {
                memberId,
            },
        });
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.MemberService = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};
