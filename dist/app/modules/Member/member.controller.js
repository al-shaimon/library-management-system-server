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
exports.MemberController = void 0;
const member_service_1 = require("./member.service");
const http_status_1 = __importDefault(require("http-status"));
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_service_1.MemberService.createMember(req.body);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to create member',
            });
        }
        res.status(http_status_1.default.CREATED).json({
            success: true,
            status: http_status_1.default.CREATED,
            message: 'Member created successfully',
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
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_service_1.MemberService.getAllMembers();
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to retrieve members',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Members retrieved successfully',
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
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const result = yield member_service_1.MemberService.getMemberById(memberId);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to retrieve member',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Member retrieved successfully',
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
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const result = yield member_service_1.MemberService.updateMember(memberId, req.body);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to update member',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Member updated successfully',
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
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const result = yield member_service_1.MemberService.deleteMember(memberId);
        if (!result) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                status: http_status_1.default.BAD_REQUEST,
                message: 'Failed to delete member',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: 'Member successfully deleted',
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
exports.MemberController = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};
